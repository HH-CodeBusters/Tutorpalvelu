package hh_codebusters.tutorpalvelu.config;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import hh_codebusters.tutorpalvelu.service.JwtService;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);
    private final JwtService jwtService;

    public AuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, java.io.IOException {
        String requestPath = request.getRequestURI();
        logger.debug("AuthenticationFilter processing request: {} {}", request.getMethod(), requestPath);
        
        String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (jws != null) {
            logger.debug("Authorization header found, attempting to extract user");
            String user = jwtService.getAuthUser(request);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Authentication set for user: {}", user);
        } else {
            logger.debug("No Authorization header for request: {}", requestPath);
        }
        filterChain.doFilter(request, response);
    }
}
