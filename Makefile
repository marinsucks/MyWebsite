DC_FILE = docker-compose.yml
CERTS_DIR = certs/

all: certs up

certs:
	@chmod +x scripts/ssl.sh
	@set -a; . .env; set +a; ./scripts/ssl.sh "$${SSL_FRONT_KEY}" "$${SSL_FRONT_CERT}" $(CERTS_DIR) frontend

up:
	@docker compose -f $(DC_FILE) up -d

down:
	@docker compose -f $(DC_FILE) down

logs:
	@docker compose -f $(DC_FILE) logs -f

re: down up

.PHONY: all certs up down logs re

pre-commit:
	@pip3 install --quiet pre-commit
	@pre-commit install
	@pre-commit autoupdate
