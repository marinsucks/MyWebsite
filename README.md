# 🌐 MyWebsite - Déploiement Docker avec HTTPS Automatique

Déploiement automatisé d'un site web statique avec certificats SSL Let's Encrypt via nginx-proxy + acme-companion.

## 🚀 Déploiement Rapide

```bash
# 1. Configurer les variables d'environnement
cp example.env .env
# Éditer .env avec votre DOMAIN et EMAIL

# 2. Déployer en une commande
make deploy
```

Votre site sera automatiquement disponible en HTTPS sur :
- `https://yourdomain.com` (v2 - React)  
- `https://v1.yourdomain.com` (v1 - statique)
- `https://v2.yourdomain.com` (v2 - React)

## 📁 Architecture

```
MyWebsite/
├── docker-compose.yml          # Services nginx-proxy + acme + site
├── .env                        # Configuration DOMAIN + EMAIL
├── Makefile                    # Commandes de déploiement
├── frontend/
│   ├── Dockerfile             # Build React + serve nginx
│   ├── nginx.conf             # Config nginx interne
│   └── src/                   # Code React/TypeScript
├── certs/                     # Certificats SSL auto-générés
├── vhost.d/                   # Config nginx-proxy
├── html/                      # Challenge Let's Encrypt
└── acme/                      # Données acme.sh
```

## 🔧 Commandes Disponibles

```bash
make deploy          # Déploie tout avec HTTPS automatique
make build          # Build uniquement le container site
make logs           # Logs du site en temps réel
make status         # Statut des containers
make down           # Arrête tous les services
make clean          # Nettoyage complet
make rebuild        # Clean + deploy
make ssl-status     # Vérifier les certificats SSL
```

## ⚙️ Configuration

### Variables d'environnement (.env)
```env
DOMAIN=marinbecker.me
EMAIL=admin@marinbecker.me
```

### Services Docker
- **nginx-proxy** : Reverse proxy automatique
- **acme-companion** : Génération SSL Let's Encrypt  
- **site** : Application frontend (React + v1 statique)

## 🔒 HTTPS Automatique

Les certificats SSL sont automatiquement :
- **Générés** par Let's Encrypt à la première connexion
- **Renouvelés** automatiquement avant expiration
- **Stockés** dans `./certs/` (persist entre redémarrages)

Aucune configuration manuelle requise !

## 🛠️ Développement Local

```bash
# Setup dev
make dev-setup

# Dev local avec hot-reload
cd frontend && npm run dev
```

## 📋 Prérequis

- Docker & Docker Compose
- Domaine pointant vers votre serveur (A record)
- Ports 80/443 disponibles

## ✨ Fonctionnalités

- ✅ **HTTPS automatique** via Let's Encrypt
- ✅ **Multi-domaines** (domain.com, v1.domain.com, v2.domain.com)  
- ✅ **React SPA** + site statique v1
- ✅ **Hot-reload** en développement
- ✅ **Logs centralisés**
- ✅ **Healthchecks** intégrés
- ✅ **Compression gzip**
- ✅ **Security headers**

## 🔧 Troubleshooting

```bash
# Vérifier les logs
make logs-all

# Statut des containers  
make status

# Redémarrer uniquement le site
make restart-site

# Vérifier les certificats
make ssl-status
ls -la certs/
```

Si les certificats ne se génèrent pas :
1. Vérifier que le domaine pointe bien vers le serveur
2. Vérifier que les ports 80/443 sont accessibles
3. Consulter les logs d'acme-companion : `docker logs acme-companion`
