#!/bin/bash

# Usage: ./ssl.sh <key_file> <cert_file> <destination_dir> [ssl_title]

KEY_FILE="$1"
CERT_FILE="$2"
DEST_DIR="$3"
SSL_TITLE="${4:-ssl}"


# Check for missing arguments
if [[ -z "$KEY_FILE" || -z "$CERT_FILE" || -z "$DEST_DIR" ]]; then
	echo "Usage: $0 <key_file> <cert_file> <destination_dir> [ssl_title]"
	echo "[Received '$KEY_FILE', '$CERT_FILE', '$DEST_DIR', '$SSL_TITLE']"
	exit 1
fi

# Check if key and cert already exist in destination
if [[ -f "$DEST_DIR/$SSL_TITLE.key" && -f "$DEST_DIR/$SSL_TITLE.crt" ]]; then
	echo "SSL key and certificate already exist in $DEST_DIR"
	exit 0
fi

mkdir -p "$DEST_DIR" || { echo "Failed to create destination directory."; exit 1; }

# Check if key and cert files exist
if [[ -f "$KEY_FILE" && -f "$CERT_FILE" ]]; then
	cp "$KEY_FILE" "$DEST_DIR/$SSL_TITLE.key" && cp "$CERT_FILE" "$DEST_DIR/$SSL_TITLE.crt"
	echo "Copied:"
	echo "$KEY_FILE: $DEST_DIR/$SSL_TITLE.key"
	echo "$CERT_FILE: $DEST_DIR/$SSL_TITLE.crt"
	exit 0
fi


NEW_KEY="$DEST_DIR/$SSL_TITLE.key"
NEW_CERT="$DEST_DIR/$SSL_TITLE.crt"

echo "Generating new SSL key and certificate in $DEST_DIR..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout "$NEW_KEY" -out "$NEW_CERT" \
	-subj "/CN=localhost" || { echo "OpenSSL failed."; exit 1; }

echo "Generated:"
echo "Key: $NEW_KEY"
echo "Cert: $NEW_CERT"