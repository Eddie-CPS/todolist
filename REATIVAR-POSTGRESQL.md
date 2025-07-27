# 🐘 Guia para Reativar PostgreSQL

Este arquivo contém instruções para reativar o PostgreSQL no projeto TodoList.

## 🔧 Como Reativar PostgreSQL

### 1️⃣ **Descomentar dependência no pom.xml**
```xml
<!-- Descomente esta seção no pom.xml -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 2️⃣ **Descomentar configurações no application.yml**
```yaml
# Descomente as seções PostgreSQL no final do application.yml
---
# Configuração para PostgreSQL local
spring:
  config:
    activate:
      on-profile: local-postgres
  datasource:
    url: jdbc:postgresql://localhost:5432/todolist
    username: postgres
    password: 123456
    driver-class-name: org.postgresql.Driver
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
```

### 3️⃣ **Reativar configuração no render.yaml (para produção)**
```yaml
# Descomente estas seções no render.yaml
envVars:
  - key: SPRING_PROFILES_ACTIVE
    value: prod

databases:
  - name: todolist-db
    databaseName: todolist
    user: todolist_user
    region: oregon
    plan: free
```

### 4️⃣ **Renomear arquivo de configuração**
```bash
# Renomeie de volta:
mv application-postgres-DISABLED.properties application-local-postgres.properties
```

### 5️⃣ **Comandos para executar**
```bash
# Build
mvn clean install

# Com PostgreSQL local
mvn spring-boot:run -Dspring.profiles.active=local-postgres

# Push para produção
git add .
git commit -m "Reativar PostgreSQL"
git push origin master
```

## 📋 **Scripts Úteis Mantidos**
- `criar-banco.bat` - Criar banco PostgreSQL local
- `resolver-postgres.bat` - Resolver problemas PostgreSQL
- `postgres-docker-facil.bat` - PostgreSQL via Docker

## 🎯 **Estado Atual**
- ✅ H2 Database ativo por padrão
- ✅ PostgreSQL configurado mas desabilitado
- ✅ Fácil reativação quando necessário
- ✅ Aplicação funciona normalmente com H2
