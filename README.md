# 🏃‍♂️ 15ª Corrida do Banco Millennium BIM - Monorepo

Bem-vindo ao repositório monorepo para a **15ª Corrida do Banco Millennium BIM**! Este projeto destina-se ao desenvolvimento de uma aplicação web que facilita a organização e participação no evento. O sistema é composto por múltiplos serviços que trabalham juntos para fornecer uma plataforma eficiente e intuitiva para administração, inscrição e acompanhamento dos participantes.

## 🚀 Serviços

Este monorepo contém os seguintes serviços principais:

1. **Participants**: Serviço responsável por toda a lógica relacionada à criação e recuperação de participantes da corrida.
3. **Dashboard**: Interface administrativa que permite aos administradores visualizar e gerenciar os participantes cadastrados.
4. **Client**: Landing page onde os participantes podem se inscrever na corrida e obter informações sobre o evento.

## 🛠️ Tecnologias

Este projeto utiliza as seguintes tecnologias e ferramentas:

- **Docker**: Containerização dos serviços.
- **Docker Compose**: Orquestração dos containers.
- **Bun**: Backend dos serviços.
- **Next.js**: Frontend da dashboard e da landing page.

## 🐳 Setup com Docker

Para rodar o projeto localmente utilizando Docker e Docker Compose, siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/LissaiDev/repo-corrida-bim.git
   cd repo-corrida-bim
   ```

2. Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados na sua máquina.

3. Inicie os containers usando o comando:
   ```bash
   docker-compose up --build
   ```

4. Acesse os serviços:

   - **Client**: [http://localhost:3000](http://localhost:3000)
   - **Dashboard**: [http://localhost:3001](http://localhost:3001)

   Outros serviços, como `participants`, estarão rodando nas portas definidas no `docker-compose.yml`.

## 📁 Estrutura do Repositório

```bash
.
├── participants/       # Serviço de gestão de participantes
├── dashboard/          # Painel administrativo (Frontend)
├── client/             # Página inicial e formulário de inscrição (Frontend)
├── docker-compose.yml  # Arquivo de configuração do Docker Compose
└── README.md           # Este arquivo
```

## ⚙️ Comandos Úteis

### Derrubar os containers

```bash
docker-compose down
```

### Atualizar as dependências de um serviço

```bash
cd participants
bun install
```

## 📊 Monitoramento

Para monitorar os logs dos containers em tempo real, você pode usar o seguinte comando:

```bash
docker-compose logs -f
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Esperamos que este projeto seja um sucesso! Boa corrida! 🏅
