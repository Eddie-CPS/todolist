@echo off
title PostgreSQL - Como Funciona
color 0B

echo.
echo ========================================
echo    POSTGRESQL: SERVICO DO WINDOWS
echo ========================================
echo.
echo O PostgreSQL NAO e um programa clicavel (.exe)!
echo Ele e um SERVICO que roda em segundo plano.
echo.
echo ========================================
echo    COMO VERIFICAR SE ESTA RODANDO
echo ========================================
echo.
echo 1. SERVICES DO WINDOWS:
echo    - Win + R → services.msc
echo    - Procure: postgresql-x64-XX
echo    - Status deve estar: "Em execucao"
echo.
echo 2. GERENCIADOR DE TAREFAS:
echo    - Ctrl + Shift + Esc
echo    - Aba "Servicos"
echo    - Procure: postgresql
echo.
echo 3. LINHA DE COMANDO:
echo    - sc query postgresql-x64-15
echo    - netstat -an ^| findstr :5432
echo.
echo ========================================
echo    COMO CONTROLAR O SERVICO
echo ========================================
echo.
echo INICIAR:   net start postgresql-x64-15
echo PARAR:     net stop postgresql-x64-15
echo REINICIAR: net restart postgresql-x64-15
echo.
echo ========================================
echo    PROGRAMAS POSTGRESQL QUE VOCE PODE ABRIR
echo ========================================
echo.
echo 1. pgAdmin 4 - Interface grafica para gerenciar bancos
echo    Local: C:\Program Files\PostgreSQL\XX\pgAdmin 4\bin\pgAdmin4.exe
echo.
echo 2. psql - Linha de comando do PostgreSQL
echo    Comando: psql -U postgres
echo.
echo 3. SQL Shell - Terminal do PostgreSQL
echo    Menu Iniciar → PostgreSQL → SQL Shell
echo.
echo ========================================
echo    AUTO-INICIO
echo ========================================
echo.
echo Por padrao, PostgreSQL:
echo ✅ Inicia automaticamente com o Windows
echo ✅ Tipo de inicializacao: Automatico
echo ✅ Nao precisa fazer nada manualmente
echo.
echo Se NAO esta iniciando automaticamente:
echo 1. services.msc
echo 2. postgresql-x64-XX → Propriedades
echo 3. Tipo de inicializacao: Automatico
echo.
pause
