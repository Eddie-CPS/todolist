package  br.com.edianesouza.todolist.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IUserRepository extends JpaRepository <UserModel, UUID> {
    // Aqui você pode definir métodos específicos para interagir com o banco de dados
    // por exemplo, encontrar usuários por nome, email, etc.
    // Exemplo:
    // Optional<UserModel> findByUsername(String username);
    UserModel findByUsername(String username);



}