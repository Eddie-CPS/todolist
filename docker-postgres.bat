@echo off
title Docker PostgreSQL Setup
color 0B

echo.
echo =======================================
echo    POSTGRESQL COM DOCKER
echo =======================================
echo.
echo 1. Instalar Docker Desktop:
echo    https://www.docker.com/products/docker-desktop
echo.
echo 2. Executar PostgreSQL:
echo.

echo docker run --name postgres-todolist -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=todolist -p 5432:5432 -d postgres:15

echo.
echo 3. Verificar se esta rodando:
echo.

echo docker ps

echo.
echo 4. Executar sua aplicacao:
echo.

echo mvn spring-boot:run -Dspring-boot.run.profiles=local-postgres

echo.
echo 5. Para parar o container:
echo.

echo docker stop postgres-todolist

echo.
echo 6. Para iniciar novamente:
echo.

echo docker start postgres-todolist

echo.
echo =======================================
echo    COMANDOS UTEIS
echo =======================================
echo.
echo Ver logs do PostgreSQL:
echo docker logs postgres-todolist
echo.
echo Conectar via linha de comando:
echo docker exec -it postgres-todolist psql -U postgres -d todolist
echo.
echo Remover container (CUIDADO - perde dados):
echo docker rm -f postgres-todolist
echo.
pause
