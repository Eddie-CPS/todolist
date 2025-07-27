package br.com.edianesouza.todolist.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseConnectionTest implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            String url = connection.getMetaData().getURL();
            String usuario = connection.getMetaData().getUserName();
            String driver = connection.getMetaData().getDriverName();
            
            System.out.println("=======================================");
            System.out.println("🔗 CONEXÃO COM BANCO DE DADOS");
            System.out.println("=======================================");
            System.out.println("✅ URL: " + url);
            System.out.println("✅ Usuário: " + usuario);
            System.out.println("✅ Driver: " + driver);
            System.out.println("=======================================");
            
            if (url.contains("postgresql")) {
                System.out.println("🐘 PostgreSQL conectado com sucesso!");
            } else if (url.contains("h2")) {
                System.out.println("🗄️ H2 Database conectado com sucesso!");
            }
            System.out.println("=======================================");
            
        } catch (Exception e) {
            System.err.println("❌ Erro na conexão: " + e.getMessage());
        }
    }
}
