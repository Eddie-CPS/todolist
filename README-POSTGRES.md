# ===============================================
# CONFIGURACAO SUPABASE (PostgreSQL Gratuito)
# ===============================================

# 1. Acesse: https://supabase.com
# 2. Crie conta gratuita
# 3. Crie novo projeto
# 4. Na Dashboard > Settings > Database
# 5. Copie a "Connection String"

# Exemplo de connection string Supabase:
# postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres

# ===============================================
# CONFIGURACAO PARA DESENVOLVIMENTO COM SUPABASE
# ===============================================

# Cole suas credenciais aqui:
spring.config.activate.on-profile=dev-supabase
spring.datasource.url=postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=[SUA-SENHA]
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

# Para executar:
# mvn spring-boot:run -Dspring-boot.run.profiles=dev-supabase
