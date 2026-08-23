# Makefile para gerenciamento do ambiente Docker

# Variáveis
COMPOSE_FILE = docker-compose.yml
COMPOSE = docker compose -f $(COMPOSE_FILE)
PROJECT_NAME = millenniumbim

# Funções básicas
.PHONY: up dev down start stop restart build rebuild logs clean prune ps exec

up: ## Sobe todos os serviços em modo deamon (em background)
	@echo "Iniciando os containers em modo detached..."
	$(COMPOSE) -p $(PROJECT_NAME) up -d

dev: ## Sobe os serviços em ambiente de desenvolvimento (docker-compose.dev.yml)
	@echo "Iniciando os containers em ambiente de desenvolvimento..."
	docker compose -f docker-compose.dev.yml -p $(PROJECT_NAME) up -d --build



down: ## Para e remove todos os containers e redes
	@echo "Parando e removendo containers e redes..."
	$(COMPOSE) -p $(PROJECT_NAME) down

start: ## Inicia os containers parados
	@echo "Iniciando os containers parados..."
	$(COMPOSE) -p $(PROJECT_NAME) start

stop: ## Para os containers sem remover
	@echo "Parando os containers..."
	$(COMPOSE) -p $(PROJECT_NAME) stop

restart: ## Reinicia os containers
	@echo "Reiniciando os containers..."
	$(COMPOSE) -p $(PROJECT_NAME) restart

build: ## Constroi as imagens dos serviços
	@echo "Construindo as imagens dos serviços..."
	$(COMPOSE) -p $(PROJECT_NAME) build

rebuild: ## Reconstroi as imagens dos serviços sem cache
	@echo "Reconstuindo as imagens dos serviços sem cache..."
	$(COMPOSE) -p $(PROJECT_NAME) build --no-cache

logs: ## Exibe os logs de todos os serviços
	@echo "Mostrando logs de todos os serviços..."
	$(COMPOSE) -p $(PROJECT_NAME) logs -f

logs-%: ## Exibe os logs de um serviço específico (exemplo: make logs-server)
	@echo "Mostrando logs do serviço $*..."
	$(COMPOSE) -p $(PROJECT_NAME) logs -f $*

clean: ## Remove containers, volumes e redes, preservando imagens
	@echo "Limpando containers, volumes e redes..."
	$(COMPOSE) -p $(PROJECT_NAME) down -v

prune: ## Remove todas as imagens, containers, volumes e redes não utilizadas
	@echo "Executando Docker prune..."
	docker system prune -af --volumes

ps: ## Lista o status dos containers
	@echo "Exibindo status dos containers..."
	$(COMPOSE) -p $(PROJECT_NAME) ps

exec-%: ## Acessa o bash de um container específico (exemplo: make exec-server)
	@echo "Acessando o container $*..."
	$(COMPOSE) -p $(PROJECT_NAME) exec $* /bin/bash

# Auxílio
.PHONY: help
help: ## Exibe esta ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

