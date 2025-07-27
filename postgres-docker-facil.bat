@echo off
title PostgreSQL com Docker - TodoList
color 0A

echo.
echo =======================================
echo    POSTGRESQL COM DOCKER (FACIL)
echo =======================================
echo.
echo 1. Baixar Docker Desktop:
echo    https://www.docker.com/products/docker-desktop
echo.
echo 2. Apos instalar Docker, execute:
echo.
echo docker run --name todolist-postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=todolist -p 5432:5432 -d postgres:15
echo.
echo 3. Verificar se esta rodando:
echo docker ps
echo.
echo 4. Testar sua aplicacao:
echo mvn spring-boot:run -Dspring-boot.run.profiles=local-postgres
echo.
echo =======================================
echo    COMANDOS UTEIS
echo =======================================
echo.
echo Parar: docker stop todolist-postgres
echo Iniciar: docker start todolist-postgres
echo Ver logs: docker logs todolist-postgres
echo.
echo =======================================
echo    SE NAO QUISER DOCKER
echo =======================================
echo.
echo Use PostgreSQL online GRATUITO:
echo 1. Supabase: https://supabase.com
echo 2. Neon: https://neon.tech
echo 3. Railway: https://railway.app
echo.
pause
