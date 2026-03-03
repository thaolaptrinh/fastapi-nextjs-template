# AGENTS.md

## Commands

### Development
```bash
make dev              # Start all containers (frontend + backend + db)
make dev-fe           # Start frontend container only
make dev-be           # Start backend container only
make up               # Start infrastructure (db, adminer, mailcatcher)
make down             # Stop all containers
make logs             # View logs (all containers)
make ps               # Show running containers
```

### Database
```bash
make db-reset        # Reset database (delete + recreate + migrate)
make db-migrate      # Run migrations
make db-seed         # Create initial data
```

### Code Quality & Testing
```bash
make test            # Run all tests
make lint           # Lint code
make format         # Format code

# Run single test in backend container
docker compose exec -T backend pytest tests/test_x.py::test_abc

# Frontend
docker compose exec -T frontend bun run lint
docker compose exec -T frontend bun run test
docker compose exec -T frontend playwright test --project=chromium tests/test_x.spec.ts
```

### Build
```bash
make build-fe        # Build frontend Docker image
make build-be        # Build backend Docker image
```

## Code Style Guidelines

### Frontend (Next.js/React)
- Imports: `@/*` path aliases, external → internal → types → styles
- Formatting: Biome, double quotes, 2 spaces, self-closing tags
- Types: TypeScript strict, `interface` for APIs, explicit types
- Naming: Components PascalCase, functions camelCase, hooks `use*`, Client suffix
- Error handling: try-catch, Error Boundaries, route-level boundaries
- Best practices: `React.memo`, `next/dynamic`, SWR/React Query, functional state updates

### Backend (FastAPI/Python)
- Imports: `from __future__ import annotations`, stdlib → third-party → local
- Formatting: ruff, PEP 8 (line length 88)
- Type hints: `|` union operator, mypy strict, avoid Any
- Naming: Classes PascalCase, functions snake_case, constants UPPER_SNAKE_CASE, private `_`
- Error handling: FastAPI HTTPException, Pydantic validation, custom exceptions, global handler
- Async: async/await throughout, httpx, tenacity, after() for non-blocking
- Database: SQLModel with type-annotated fields, Alembic for migrations

**Pre-commit Hooks**
- All code changes go through pre-commit hooks
- Automatic linter and formatter checks
- Frontend: Biome lint
- Backend: Ruff check + format + mypy
- Frontend SDK generation (automatic when API changes)
