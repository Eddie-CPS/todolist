package br.com.edianesouza.todolist.filter;

import at.favre.lib.crypto.bcrypt.BCrypt;
import br.com.edianesouza.todolist.user.IUserRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Base64;

@Component
public class FilterTaskAuth extends OncePerRequestFilter {

    @Autowired
    private IUserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        var servletPAth = request.getServletPath();

        if (servletPAth.startsWith("/tasks/")) {

            //Pegar a autenticação  (usuário e senha)
            var authorization = request.getHeader("Authorization");

            //Decodificar
            var authEncoded = authorization.substring("Basic ".length()).trim();
            byte[] authDecode = Base64.getDecoder().decode(authEncoded);

            var authString = new String(authDecode);


            //Separar usuário e senha
            //["EddieCPS", "123456"]

            String[] credentials = authString.split(":");
            String username = credentials[0];
            String password = credentials[1];
            //Validar Usuario

            var user = this.userRepository.findByUsername(username);
            if(user == null){
                response.sendError(401);
            } else {
                //Validar Senha
                var passwordVerify = BCrypt.verifyer().verify(password.toCharArray(), user.getPassword());
                if(passwordVerify.verified) {
                    //Segue o fluxo
                    request.setAttribute("idUser", user.getId());
                    filterChain.doFilter(request, response);
                }else{
                    response.sendError(401);
                }

            }

        }else {
            //Se não for a rota de tarefas, apenas segue o fluxo
            filterChain.doFilter(request, response);
        }





    }
}

