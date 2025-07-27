@echo off
echo ====================================
echo    INSTALACAO POSTGRESQL LOCAL
echo ====================================
echo.
echo 1. Download PostgreSQL:
echo    https://www.postgresql.org/download/windows/
echo.
echo 2. Durante instalacao:
echo    - Usuario: postgres
echo    - Senha: 123456
echo    - Porta: 5432
echo.
echo 3. Criar banco:
echo    createdb -U postgres todolist
echo.
echo 4. Executar aplicacao com perfil PostgreSQL:
echo    mvn spring-boot:run -Dspring-boot.run.profiles=dev-postgres
echo.
echo ====================================
echo    ALTERNATIVAS ONLINE GRATUITAS
echo ====================================
echo.
echo 1. Supabase: https://supabase.com (500MB gratis)
echo 2. Railway: https://railway.app (5GB gratis)
echo 3. Neon: https://neon.tech (10GB gratis)
echo 4. ElephantSQL: https://elephantsql.com (20MB gratis)
echo.
pause
