#!/bin/bash


if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Error: DOMAIN and EMAIL environment variables must be set"
    echo "Please update your .env file with:"
    echo "DOMAIN=yourdomain.com"
    echo "EMAIL=your@email.com"
    exit 1
fi

domains=($DOMAIN www.$DOMAIN v2.$DOMAIN)
rsa_key_size=4096
data_path=$1

if [ -z "$data_path" ]; then
  echo "Usage: $0 <data_path>"
  exit 1
fi

echo "Initializing SSL certificates for domains: ${domains[@]}"
echo "Email: $EMAIL"

# Créer les dossiers nécessaires
mkdir -p "$data_path/conf"
mkdir -p "$data_path/www"

# Télécharger les options SSL recommandées
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ]; then
  echo "Downloading recommended SSL options..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
fi

if [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "Downloading SSL DH params..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
fi

# Créer un certificat temporaire pour démarrer nginx
echo "Creating temporary certificates..."
for domain in "${domains[@]}"; do
  path="/etc/letsencrypt/live/$domain"
  mkdir -p "$data_path/conf/live/$domain"
  docker run --rm -v "$data_path/conf:/etc/letsencrypt" \
    --entrypoint "openssl" certbot/certbot \
    req -x509 -nodes -newkey rsa:1024 -days 1 \
    -keyout "$path/privkey.pem" \
    -out "$path/fullchain.pem" \
    -subj "/CN=localhost"
done

echo "Starting nginx..."
docker-compose up -d frontend

echo "Waiting for nginx to start..."
sleep 10

# Supprimer les certificats temporaires
echo "Removing temporary certificates..."
for domain in "${domains[@]}"; do
  docker run --rm -v "$data_path/conf:/etc/letsencrypt" \
    --entrypoint "rm" certbot/certbot \
    -rf "/etc/letsencrypt/live/$domain"
done

# Demander les vrais certificats
echo "Requesting real certificates..."
for domain in "${domains[@]}"; do
  echo "Requesting certificate for $domain..."
  docker run --rm -v "$data_path/conf:/etc/letsencrypt" \
    -v "$data_path/www:/var/www/certbot" \
    certbot/certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $domain
done

echo "Restarting nginx with real certificates..."
docker-compose restart frontend

echo "SSL initialization complete!"
echo "Your sites should now be available at:"
echo "- https://$DOMAIN (v1)"
echo "- https://www.$DOMAIN (v1)"
echo "- https://v2.$DOMAIN (v2)"
