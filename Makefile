DC_FILE = docker-compose.yml

all: up

pre-commit:
	@pip3 install --quiet pre-commit
	@pre-commit install
	@pre-commit autoupdate

up:
	@docker compose -f $(DC_FILE) up -d

down:
	@docker compose -f $(DC_FILE) down

logs:
	@docker compose -f $(DC_FILE) logs -f

re: down up

npm:
	@cd frontend && npm install

.PHONY: all up down logs re
