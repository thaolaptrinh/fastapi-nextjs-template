# Makefile - FastAPI + Next.js Full Stack

# ============== VARIABLES ==============
BE := backend
FE := frontend
PYTHON_VENV := .venv

# ============== HELP ==============
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  dev         Start all containers (frontend + backend + db)"
	@echo "  dev-fe      Start frontend container only"
	@echo "  dev-be      Start backend container only"
	@echo "  up          Start infrastructure (db, adminer, mailcatcher)"
	@echo "  down        Stop all containers"
	@echo ""
	@echo "Database:"
	@echo "  db-reset    Reset database (delete + recreate + migrate)"
	@echo "  db-migrate  Run migrations"
	@echo "  db-seed     Create initial data"
	@echo ""
	@echo "Tools (Container):"
	@echo "  test        Run all tests in containers"
	@echo "  lint        Lint code in containers"
	@echo "  format      Format code in containers"
	@echo "  build-fe    Build frontend Docker image"
	@echo "  build-be    Build backend Docker image"

# ============== DEVELOPMENT ==============
.PHONY: dev
dev:
	docker compose up -d frontend backend prestart db adminer mailcatcher
	@echo "Waiting for services..." && for i in $$(seq 1 60); do docker compose ps frontend backend | grep -q "up" && break || sleep 2; done
	@echo "All services started"

.PHONY: dev-fe
dev-fe:
	docker compose up -d frontend prestart
	@echo "Waiting for frontend..." && for i in $$(seq 1 30); do docker compose ps frontend | grep -q "up" && break || sleep 2; done
	@echo "Frontend container started"

.PHONY: dev-be
dev-be:
	docker compose up -d backend prestart db adminer mailcatcher
	@echo "Waiting for backend..." && for i in $$(seq 1 30); do docker compose ps backend | grep -q "up" && break || sleep 2; done
	@echo "Backend container started"

.PHONY: up
up:
	docker compose up -d db adminer mailcatcher

.PHONY: down
down:
	docker compose down -v --remove-orphans

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: ps
ps:
	docker compose ps

# ============== DATABASE ==============
.PHONY: db-reset
db-reset:
	docker compose down -v --remove-orphans
	docker compose up -d db
	@echo "Waiting for DB..." && for i in $$(seq 1 30); do docker compose ps db | grep -q "healthy" && break || sleep 2; done
	$(MAKE) db-migrate

.PHONY: db-migrate
db-migrate:
	docker compose exec -T backend alembic upgrade head

.PHONY: db-seed
db-seed:
	docker compose exec -T backend python app/initial_data.py

# ============== SETUP ==============
.PHONY: setup
setup: install
	@if [ ! -f .env ]; then cp .env.example .env; echo "Created .env"; fi

.PHONY: install
install:
	docker compose run --rm backend uv sync
	docker compose run --rm frontend bun install

# ============== TOOLS (CONTAINER) ==============
.PHONY: test
test:
	docker compose exec -T backend pytest tests/
	docker compose exec -T frontend bun run test

.PHONY: lint
lint:
	docker compose exec -T frontend bun run lint
	docker compose exec -T backend uv run ruff check .

.PHONY: format
format:
	docker compose exec -T backend uv run ruff format .

.PHONY: build-fe
build-fe:
	docker compose build frontend

.PHONY: build-be
build-be:
	docker compose build backend

.PHONY: clean
clean:
	rm -rf $(BE)/$(PYTHON_VENV) $(FE)/.next $(FE)/node_modules node_modules
	@echo "Cleaned"
