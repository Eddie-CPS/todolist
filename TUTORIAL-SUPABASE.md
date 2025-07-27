# ===============================================
# TUTORIAL: PostgreSQL GRATUITO com SUPABASE
# ===============================================

## 1. Criar conta no Supabase
- Acesse: https://supabase.com
- Clique em "Start your project"
- Faça login com GitHub

## 2. Criar projeto
- Clique em "New Project"
- Nome: todolist-app
- Database Password: escolha uma senha forte
- Region: South America (mais próximo)
- Clique em "Create new project"

## 3. Pegar credenciais
- Aguarde 2-3 minutos o projeto criar
- Vá em: Settings → Database
- Copie a "Connection string":
  postgresql://postgres:[SUA-SENHA]@db.[PROJETO].supabase.co:5432/postgres

## 4. Configurar sua aplicação
- Abra: src/main/resources/application.yml
- Adicione o perfil supabase com suas credenciais

## 5. Executar aplicação
mvn spring-boot:run -Dspring-boot.run.profiles=supabase

## ✅ PRONTO! 
Seu banco PostgreSQL está na nuvem, gratuito, e funcionando!

## Vantagens Supabase:
- ✅ 500MB gratuito
- ✅ Interface web para ver dados
- ✅ Backups automáticos
- ✅ Não precisa instalar nada no PC
