DC_FILE = docker-compose.yml

all: up

up:
	@docker compose -f $(DC_FILE) up -d --remove-orphans

down:
	@docker compose -f $(DC_FILE) down

build:
	@docker compose -f $(DC_FILE) build

logs:
	@docker compose -f $(DC_FILE) logs -f

clean: down
	@rm -rf frontend/{node_modules,dist,build,certs}

re: clean up

rebuild: clean build up

.PHONY: all up down logs re

pre-commit:
	@pip3 install --quiet pre-commit
	@pre-commit install
	@pre-commit autoupdate
