@echo off
title Resolver Problemas PostgreSQL
color 0C

echo.
echo ========================================
echo    DIAGNOSTICO POSTGRESQL
echo ========================================
echo.
echo Verificando se o servico esta rodando...
echo.

sc query postgresql-x64-15
if %errorlevel% neq 0 (
    sc query postgresql-x64-14
    if %errorlevel% neq 0 (
        sc query postgresql-x64-13
        if %errorlevel% neq 0 (
            echo ❌ Servico PostgreSQL nao encontrado
            echo.
            echo Procurando outros servicos PostgreSQL...
            sc query | findstr /i postgres
        )
    )
)

echo.
echo ========================================
echo    SOLUCOES COMUNS
echo ========================================
echo.
echo 1. INICIAR SERVICO MANUALMENTE:
echo    - Pressione Win + R
echo    - Digite: services.msc
echo    - Procure "postgresql"
echo    - Clique direito → Iniciar
echo.
echo 2. VIA LINHA DE COMANDO (Execute como Admin):
echo    net start postgresql-x64-15
echo    (ou postgresql-x64-14, postgresql-x64-13)
echo.
echo 3. VERIFICAR PORTA 5432:
echo    netstat -an ^| findstr :5432
echo.
echo 4. TESTAR CONEXAO:
echo    psql -U postgres -h localhost -p 5432
echo.
echo ========================================
echo    COMANDOS DE DIAGNOSTICO
echo ========================================
echo.
echo Ver todos os servicos PostgreSQL:
sc query ^| findstr /i postgres

echo.
echo Ver processos PostgreSQL:
tasklist ^| findstr postgres

echo.
echo Ver porta 5432:
netstat -an ^| findstr :5432

echo.
echo ========================================
echo    SE NADA FUNCIONAR
echo ========================================
echo.
echo 1. Reiniciar o PC
echo 2. Executar como Administrador
echo 3. Verificar logs em: C:\Program Files\PostgreSQL\[versao]\data\log
echo 4. Reinstalar PostgreSQL
echo.
pause
