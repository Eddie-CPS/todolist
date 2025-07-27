@echo off
title Configuracao PostgreSQL Local
color 0A

echo.
echo ========================================
echo    INSTALACAO POSTGRESQL WINDOWS
echo ========================================
echo.
echo 1. Download PostgreSQL:
echo    https://www.postgresql.org/download/windows/
echo.
echo 2. Durante a instalacao:
echo    - Usuario: postgres
echo    - Senha: 123456
echo    - Porta: 5432
echo.
echo 3. Apos instalacao, abra CMD/PowerShell como Admin:
echo.
echo    createdb -U postgres todolist
echo.
echo 4. Para testar conexao:
echo    psql -U postgres -d todolist
echo.
echo ========================================
echo    EXECUTAR COM POSTGRESQL LOCAL
echo ========================================
echo.
echo mvn spring-boot:run -Dspring-boot.run.profiles=local-postgres
echo.
echo ========================================
echo    ALTERNATIVA: DOCKER POSTGRESQL
echo ========================================
echo.
echo docker run --name postgres-todolist -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=todolist -p 5432:5432 -d postgres:15
echo.
echo ========================================
echo    FERRAMENTAS PARA GERENCIAR BANCO
echo ========================================
echo.
echo 1. pgAdmin: https://www.pgadmin.org/
echo 2. DBeaver: https://dbeaver.io/
echo 3. VS Code Extension: PostgreSQL by Chris Kolkman
echo.
pause
