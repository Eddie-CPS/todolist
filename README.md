📝 TodoList - Gerenciador de Tarefas
Java Spring Boot Maven Docker Deploy Licença

🚀 API REST para gerenciamento de tarefas desenvolvida com Spring Boot, PostgreSQL e deploy automatizado no Render.

📋 Índice
📖 Sobre o Projeto
✨ Funcionalidades
🛠️ Tecnologias
🚀 Como Executar
🐳 Docker
🌐 Deploy
📚 Endpoints da API
🔄 Atualizações Recentes
💡 Ideias para Implementação
📁 Estrutura do Projeto
🤝 Contribuindo
👨‍💻 Autor
📖 Sobre o Projeto
Este é um sistema de gerenciamento de tarefas (TodoList) desenvolvido como uma API REST usando Spring Boot. O projeto permite que usuários criem, leiam, atualizem e excluam tarefas, com autenticação básica e validações.

🎯 Objetivos
✅ Demonstrar conhecimentos em Spring Boot e API REST
✅ Implementar autenticação e autorização
✅ Usar PostgreSQL para persistência de dados
✅ Deploy automatizado na nuvem (Render)
✅ Containerização com Docker
✨ Funcionalidades
👤 Usuários
✅ Cadastro de usuários
✅ Autenticação básica
✅ Criptografia de senhas (BCrypt)
📝 Tarefas
✅ Criar tarefas
✅ Listar tarefas do usuário
✅ Atualizar tarefas
✅ Validação de propriedade (usuário só vê suas tarefas)
✅ Validação de datas e campos obrigatórios
🔒 Segurança
✅ Filtro de autenticação customizado
✅ Hash de senhas com BCrypt
✅ Proteção de rotas
🛠️ Tecnologias
Backend
Java 21 - Linguagem de programação
Spring Boot 3.5.3 - Framework principal
Spring Data JPA - Persistência de dados
Hibernate - ORM
Lombok - Redução de código boilerplate
Banco de Dados
PostgreSQL - Produção (Render)
H2 Database - Desenvolvimento local
Build & Deploy
Maven 3.9+ - Gerenciador de dependências
Docker - Containerização
GitHub Actions - CI/CD
Render - Hospedagem na nuvem
Ferramentas
BCrypt - Criptografia de senhas
UUID - Identificadores únicos
🚀 Como Executar
Pré-requisitos
Java 21+
Maven 3.9+
PostgreSQL (opcional - usa H2 por padrão)
1️⃣ Clone o repositório
git clone https://github.com/Eddie-CPS/todolist.git
cd todolist
2️⃣ Execute localmente (H2)
mvn spring-boot:run
🌐 Aplicação: http://localhost:8080
🗄️ Console H2: http://localhost:8080/h2-console
3️⃣ Execute com PostgreSQL local
# 1. Configure PostgreSQL e crie o banco
# 2. Execute:
mvn spring-boot:run -Dspring.profiles.active=local-postgres
🐳 Docker
Executar PostgreSQL com Docker
docker run --name postgres-todolist \\
  -e POSTGRES_PASSWORD=123456 \\
  -e POSTGRES_DB=todolist \\
  -p 5432:5432 \\
  -d postgres:15
Build e Run da aplicação
# Build da imagem
docker build -t todolist-app .

# Executar aplicação
docker run -p 8080:8080 --name todolist-app todolist-app
🌐 Deploy
Render (Automático)
✅ Deploy automático via GitHub
✅ PostgreSQL gratuito (1GB)
✅ HTTPS automático
✅ Domínio customizado
URL de Produção: Acesse aqui

Docker Hub
docker pull eddiecps/todolist-app:latest
docker run -p 8080:8080 eddiecps/todolist-app:latest
📚 Endpoints da API
👤 Usuários
Método	Endpoint	Descrição
POST	/users/	Criar usuário
Exemplo de requisição:

POST /users/
{
  "name": "João Silva",
  "username": "joaosilva",
  "password": "123456"
}
📝 Tarefas
Método	Endpoint	Descrição	Auth
POST	/tasks/	Criar tarefa	✅
GET	/tasks/	Listar tarefas do usuário	✅
PUT	/tasks/{id}	Atualizar tarefa	✅
Exemplo de requisição:

POST /tasks/
Authorization: Basic [base64(username:password)]

{
  "title": "Estudar Spring Boot",
  "description": "Completar curso de Spring Boot",
  "priority": "ALTA",
  "startAt": "2024-01-15T09:00:00",
  "endAt": "2024-01-15T17:00:00"
}
🔄 Atualizações Recentes
v1.0.0 (Janeiro 2025)
✅ Deploy automatizado no Render
✅ PostgreSQL configurado para produção
✅ Docker Hub - imagem publicada
✅ GitHub Actions - pipeline de CI/CD
✅ Multi-ambiente - dev (H2) + prod (PostgreSQL)
✅ Lombok - redução de código boilerplate
✅ Validações aprimoradas
Melhorias de Infraestrutura
🐳 Docker multi-stage para otimização
🔧 Perfis Spring para diferentes ambientes
📊 Logs estruturados para debugging
🔒 Configurações de segurança aprimoradas
💡 Ideias para Implementação
🔥 Próximas Funcionalidades
📊 Dashboard & Análises
 Dashboard com estatísticas de tarefas
 Gráficos de produtividade
 Relatórios de tempo gasto
 Métricas de conclusão
🔔 Notificações
 Notificações por email
 Lembretes de prazos
 WebSockets para atualizações em tempo real
 Push notifications (PWA)
👥 Colaboração
 Compartilhamento de tarefas
 Comentários em tarefas
 Atribuição para outros usuários
 Equipes e projetos
🎨 Interface Web
 Frontend React/Vue.js
 Interface responsiva
 Drag & drop para tarefas
 Temas escuro/claro
📱 Mobile
 App React Native
 App Flutter
 PWA (Progressive Web App)
🔍 Funcionalidades Avançadas
 Busca e filtros avançados
 Tags e categorias
 Subtarefas
 Anexos em tarefas
 Templates de tarefas
 Integração com calendário
🔐 Segurança & Autenticação
 Autenticação JWT
 OAuth2 (Google, GitHub)
 Rate limiting
 Auditoria de ações
🚀 Performance & Escalabilidade
 Cache com Redis
 Paginação otimizada
 API GraphQL
 Microserviços
📊 Monitoramento
 Métricas com Micrometer
 Health checks
 Distributed tracing
 Alertas
📁 Estrutura do Projeto
todolist/
├── 📁 src/main/java/br/com/edianesouza/todolist/
│   ├── 📁 errors/          # Tratamento de exceções
│   ├── 📁 filter/          # Filtros de autenticação
│   ├── 📁 task/            # Entidades e controllers de tarefas
│   ├── 📁 user/            # Entidades e controllers de usuários
│   ├── 📁 utils/           # Utilitários
│   └── 📁 config/          # Configurações
├── 📁 src/main/resources/
│   ├── application.yml     # Configurações principais
│   └── application-*.properties # Perfis específicos
├── 📁 target/              # Artefatos de build
├── 🐳 Dockerfile           # Containerização
├── ⚙️ render.yaml          # Deploy Render
├── 📄 pom.xml              # Dependências Maven
└── 📖 README.md            # Este arquivo
🤝 Contribuindo
Contribuições são bem-vindas! Para contribuir:

Fork o projeto
Crie uma branch para sua feature (git checkout -b feature/NovaFuncionalidade)
Commit suas mudanças (git commit -m 'Adiciona: nova funcionalidade incrível')
Push para a branch (git push origin feature/NovaFuncionalidade)
Abra um Pull Request
🐛 Reportando Bugs
Use as Issues do GitHub
Descreva o comportamento esperado vs atual
Inclua passos para reproduzir
Adicione screenshots se aplicável
💡 Sugerindo Melhorias
Abra uma Issue com tag enhancement
Descreva a funcionalidade desejada
Explique por que seria útil
Inclua exemplos se possível
👨‍💻 Autor
Eddie CPS

🐙 GitHub: @Eddie-CPS
💼 LinkedIn: [www.linkedin.com/in/edianesouza]
📧 Email: [ediane.s.paz@gmail.com]
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🙏 Agradecimentos
Rocketseat - Inspiração e aprendizado
Spring Boot - Framework incrível
Render - Hospedagem gratuita
Comunidade Java - Suporte e conhecimento
⭐ Se este projeto te ajudou, considere dar uma estrela!

Feito com ❤️ e ☕ por Eddie CPS
