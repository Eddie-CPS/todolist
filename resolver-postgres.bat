@echo off
title Iniciar PostgreSQL - Solucoes
color 0A

echo.
echo ========================================
echo    INICIAR POSTGRESQL - PASSO A PASSO
echo ========================================
echo.

:menu
echo Escolha uma opcao:
echo.
echo 1. Verificar status do servico
echo 2. Iniciar servico PostgreSQL
echo 3. Testar conexao
echo 4. Criar banco todolist
echo 5. Ver logs de erro
echo 6. Solucao completa (tudo automatico)
echo 0. Sair
echo.
set /p opcao="Digite sua opcao (0-6): "

if "%opcao%"=="1" goto verificar
if "%opcao%"=="2" goto iniciar
if "%opcao%"=="3" goto testar
if "%opcao%"=="4" goto criar_banco
if "%opcao%"=="5" goto logs
if "%opcao%"=="6" goto automatico
if "%opcao%"=="0" exit
goto menu

:verificar
echo.
echo ========================================
echo    VERIFICANDO SERVICOS POSTGRESQL
echo ========================================
echo.
sc query | findstr /i postgres
echo.
pause
goto menu

:iniciar
echo.
echo ========================================
echo    INICIANDO POSTGRESQL
echo ========================================
echo.
echo Tentando iniciar servico...
net start postgresql-x64-15 2>nul
if %errorlevel% neq 0 (
    net start postgresql-x64-14 2>nul
    if %errorlevel% neq 0 (
        net start postgresql-x64-13 2>nul
        if %errorlevel% neq 0 (
            echo ❌ Nao foi possivel iniciar. Execute como Administrador!
        ) else (
            echo ✅ PostgreSQL 13 iniciado!
        )
    ) else (
        echo ✅ PostgreSQL 14 iniciado!
    )
) else (
    echo ✅ PostgreSQL 15 iniciado!
)
echo.
pause
goto menu

:testar
echo.
echo ========================================
echo    TESTANDO CONEXAO
echo ========================================
echo.
echo Testando se PostgreSQL responde na porta 5432...
netstat -an | findstr :5432
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL esta ouvindo na porta 5432!
    echo.
    echo Teste de conexao (digite a senha quando solicitado):
    psql -U postgres -h localhost -c "SELECT version();"
) else (
    echo ❌ PostgreSQL nao esta rodando na porta 5432
)
echo.
pause
goto menu

:criar_banco
echo.
echo ========================================
echo    CRIANDO BANCO TODOLIST
echo ========================================
echo.
echo Digite a senha do postgres quando solicitado:
createdb -U postgres todolist
if %errorlevel% equ 0 (
    echo ✅ Banco todolist criado com sucesso!
) else (
    echo ❌ Erro ao criar banco. Verifique se PostgreSQL esta rodando.
)
echo.
pause
goto menu

:logs
echo.
echo ========================================
echo    LOGS DE ERRO POSTGRESQL
echo ========================================
echo.
echo Procurando logs...
if exist "C:\Program Files\PostgreSQL\15\data\log" (
    echo Logs PostgreSQL 15:
    dir "C:\Program Files\PostgreSQL\15\data\log\*.log" /od
    echo.
    echo Ultimo log:
    for /f %%i in ('dir "C:\Program Files\PostgreSQL\15\data\log\*.log" /b /od') do set lastlog=%%i
    type "C:\Program Files\PostgreSQL\15\data\log\%lastlog%" | tail -20
) else if exist "C:\Program Files\PostgreSQL\14\data\log" (
    echo Logs PostgreSQL 14:
    dir "C:\Program Files\PostgreSQL\14\data\log\*.log" /od
) else (
    echo ❌ Pasta de logs nao encontrada
)
echo.
pause
goto menu

:automatico
echo.
echo ========================================
echo    SOLUCAO AUTOMATICA COMPLETA
echo ========================================
echo.
echo 1. Parando servicos PostgreSQL...
net stop postgresql-x64-15 2>nul
net stop postgresql-x64-14 2>nul
net stop postgresql-x64-13 2>nul

echo.
echo 2. Aguardando 3 segundos...
timeout /t 3 /nobreak >nul

echo.
echo 3. Iniciando PostgreSQL...
net start postgresql-x64-15 2>nul
if %errorlevel% neq 0 (
    net start postgresql-x64-14 2>nul
    if %errorlevel% neq 0 (
        net start postgresql-x64-13 2>nul
    )
)

echo.
echo 4. Verificando porta 5432...
netstat -an | findstr :5432

echo.
echo 5. Criando banco todolist...
createdb -U postgres todolist 2>nul

echo.
echo ✅ Processo concluido! 
echo Se ainda nao funcionar, execute este script como Administrador.
echo.
pause
goto menu
