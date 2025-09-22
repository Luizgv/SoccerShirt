package com.soccershirt.security;
import com.soccershirt.model.User; import com.soccershirt.repository.UserRepository;
import jakarta.servlet.*; import jakarta.servlet.http.*; import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority; import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component; import org.springframework.util.StringUtils; import java.io.IOException; import java.util.List;
@Component public class JwtAuthFilter implements Filter {
  private final JwtService jwt; private final UserRepository users;
  public JwtAuthFilter(JwtService jwt, UserRepository users){ this.jwt=jwt; this.users=users; }
  @Override public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest r=(HttpServletRequest)req;
    String h=r.getHeader("Authorization");
    if(StringUtils.hasText(h)&&h.startsWith("Bearer ")){
      try{
        String email=jwt.parse(h.substring(7)).getBody().getSubject();
        User u=users.findByEmail(email).orElse(null);
        if(u!=null){ SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(email,null,List.of(new SimpleGrantedAuthority(u.getRoles())))); }
      }catch(Exception ignored){}
    }
    chain.doFilter(req,res);
  }
}
