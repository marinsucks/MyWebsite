DC_FILE = docker-compose.yml

all: check-env up

check-env:
	@set -a; source .env; set +a; \
	if [ -z "$$DOMAIN" ] || [ -z "$$EMAIL" ]; then \
		echo "Error: Please set DOMAIN and EMAIL in your .env file"; \
		echo "Example:"; \
		echo "DOMAIN=example.com"; \
		echo "EMAIL=admin@example.com"; \
		exit 1; \
	fi

init-ssl: check-env
	@chmod +x init-letsencrypt.sh
	@./scripts/certbot.sh ./certbot

up: check-env
	@source .env && docker compose -f $(DC_FILE) up --remove-orphans --build
# 	@source .env && docker compose -f $(DC_FILE) up --remove-orphans --build -d

down:
	@docker compose -f $(DC_FILE) down

build: check-env
	@docker compose -f $(DC_FILE) build

logs:
	@docker compose -f $(DC_FILE) logs -f

clean: down
	@rm -rf frontend/{node_modules,dist,build,certs}
	@rm -rf certbot logs

re: clean up

rebuild: clean build up

.PHONY: all up down logs re init-ssl check-env

pre-commit:
	@pip3 install --quiet pre-commit
	@pre-commit install
	@pre-commit autoupdate
