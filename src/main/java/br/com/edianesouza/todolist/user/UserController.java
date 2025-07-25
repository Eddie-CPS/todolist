package  br.com.edianesouza.todolist.user;


import at.favre.lib.crypto.bcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
-Modificadores
-Visibilidade: public, private, protected

 */
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/")
    public ResponseEntity create(@RequestBody UserModel userModel) {
        // Verifica se o usuário já existe
        var user = this.userRepository.findByUsername(userModel.getUsername());

        if(user!= null) {
            // Se o usuário já existe, retorna um erro
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já existe");

        }
        // Se o usuário não existe, cria um novo usuário
        // Criptografa a senha do usuário
       var passwordHasred = BCrypt.withDefaults().hashToString(12, userModel.getPassword().toCharArray());
        userModel.setPassword(passwordHasred);
        // Lógica para criar um usuário
        var userCreated = this.userRepository.save(userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);

    }

}