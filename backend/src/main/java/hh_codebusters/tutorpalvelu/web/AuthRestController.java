package hh_codebusters.tutorpalvelu.web;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import hh_codebusters.tutorpalvelu.dto.AccessTokenPayloadDto;
import hh_codebusters.tutorpalvelu.dto.LoginUserDto;
import hh_codebusters.tutorpalvelu.service.JwtService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    private static final Logger logger = LoggerFactory.getLogger(AuthRestController.class);
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthRestController(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUserDto login, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            logger.warn("Login validation failed: {}", bindingResult.getAllErrors().get(0).getDefaultMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, bindingResult.getAllErrors().get(0).getDefaultMessage());
        }
        
        logger.info("Login attempt for email: {}", login.email());
        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(login.email(), login.password());
        try {
            Authentication auth = authenticationManager.authenticate(credentials);
            logger.info("Authentication successful for: {}", login.email());
            AccessTokenPayloadDto accessTokenPayload = jwtService.getAccessToken(auth.getName());
            return ResponseEntity.ok().body(accessTokenPayload);
        } catch (Exception exception) {
            logger.debug("Authentication failed for: {}. Reason: {}", login.email(), exception.getMessage());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid username or password");
        }
    }
}