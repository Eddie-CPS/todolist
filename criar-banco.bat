@echo off
title Criar Banco TodoList no PostgreSQL
color 0A

echo.
echo ========================================
echo    CRIAR BANCO TODOLIST
echo ========================================
echo.
echo O PostgreSQL esta rodando, mas precisamos criar o banco.
echo.
echo Vou procurar o psql.exe...
echo.

set "PSQL_PATH="
for %%i in (15 14 13 12 11) do (
    if exist "C:\Program Files\PostgreSQL\%%i\bin\psql.exe" (
        set "PSQL_PATH=C:\Program Files\PostgreSQL\%%i\bin\psql.exe"
        echo Encontrado PostgreSQL %%i
        goto :found
    )
)

:found
if "%PSQL_PATH%"=="" (
    echo ❌ psql.exe nao encontrado!
    echo Tente criar o banco manualmente:
    echo 1. Abra SQL Shell do PostgreSQL
    echo 2. Digite: CREATE DATABASE todolist;
    pause
    exit
)

echo.
echo ✅ Usando: %PSQL_PATH%
echo.
echo Digite a senha do postgres quando solicitado:
echo.

"%PSQL_PATH%" -U postgres -c "CREATE DATABASE todolist;"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Banco todolist criado com sucesso!
    echo.
    echo Agora execute sua aplicacao:
    echo mvn spring-boot:run -Dspring.profiles.active=local-postgres
) else (
    echo.
    echo ❌ Erro ao criar banco. Possíveis causas:
    echo 1. Senha incorreta
    echo 2. Banco ja existe (isso e normal!)
    echo 3. PostgreSQL nao esta rodando
    echo.
    echo Tente mesmo assim executar a aplicacao:
    echo mvn spring-boot:run -Dspring.profiles.active=local-postgres
)

echo.
pause
