# Docker Compose file
DC_FILE = compose.yml

# Default target
all: check-env deploy

# Check if required environment variables are set
check-env:
	@if [ ! -f ./.env ] && [ -f ../.env ]; then \
		echo "📋 Copying .env from parent directory..."; \
		cp ../.env ./; \
	fi
	@set -a; . ./.env; set +a; \
	if [ -z "$$DOMAIN" ] || [ -z "$$EMAIL" ]; then \
		echo "❌ Error: Please set DOMAIN and EMAIL in your .env file"; \
		echo "Example:"; \
		echo "DOMAIN=marinbecker.me"; \
		echo "EMAIL=admin@marinbecker.me"; \
		exit 1; \
	fi
	@echo "✅ Environment variables OK"

# Build the site container (for local development)
build: check-env
	@echo "🏗️  Building site container locally..."
	@docker build -t ghcr.io/marinsucks/mywebsite:latest ./frontend
	@echo "✅ Build complete!"

# Deploy everything (pull latest image and start all services)
deploy: check-env
	@echo "🚀 Deploying with automatic HTTPS..."
	@echo "📥 Pulling latest image from registry..."
	@docker compose -f $(DC_FILE) pull site
	@docker compose -f $(DC_FILE) up --remove-orphans -d
	@echo "✅ Deployment complete!"
	@echo "🌐 Your site will be available at:"
	@echo "   - https://$$DOMAIN"
	@echo "   - https://v1.$$DOMAIN" 
	@echo "   - https://v2.$$DOMAIN"
	@echo "📋 SSL certificates are automatically managed by Let's Encrypt"

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	@docker compose -f $(DC_FILE) down

# Show logs for the site container
logs:
	@docker compose -f $(DC_FILE) logs -f site

# Show logs for all services
logs-all:
	@docker compose -f $(DC_FILE) logs -f

# Show status of all containers
status:
	@docker compose -f $(DC_FILE) ps

# Clean up everything (containers, images, volumes)
clean: down
	@echo "🧹 Cleaning up..."
	@rm -rf frontend/{node_modules,dist,build}
	@rm -rf logs/*
	@docker compose -f $(DC_FILE) down --volumes --remove-orphans
	@docker system prune -f

# Rebuild everything from scratch
rebuild: clean deploy

# Restart just the site service
restart-site:
	@docker compose -f $(DC_FILE) restart site

# Check SSL certificate status
ssl-status:
	@echo "🔒 SSL Certificate status:"
	@ls -la certs/ 2>/dev/null || echo "No certificates generated yet"

# Development setup
dev-setup:
	@echo "🛠️  Setting up development environment..."
	@cd frontend && npm install
	@echo "✅ Development setup complete!"

.PHONY: all check-env build deploy down logs logs-all status clean rebuild restart-site ssl-status dev-setup
