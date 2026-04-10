package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.*;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class AppUserRestController {
    private AppUserRepository repository;
    private PasswordEncoder passwordEncoder;

    public AppUserRestController(AppUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/tutors")
    public List<AppUser> tutorListRest(boolean tutor) {
        return (List<AppUser>) repository.findByTutorTrue(tutor);
    }
    
    @GetMapping ("/tutors/{id}")
    public AppUser findTutorRest(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/users/current")
    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        
        String email = authentication.getName();
        AppUser user = repository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        
        return user;
    }

    @PostMapping("/users")
    public AppUser registerUser(@RequestBody AppUser newUser) {
        // Validointi
        if (newUser.getEmail() == null || newUser.getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        
        if (newUser.getPasswordHash() == null || newUser.getPasswordHash().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        // Onko olemassa jo käyttäjää samalla sähköpostilla?
        AppUser existingUser = repository.findByEmail(newUser.getEmail());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
        }

        // Encodee salasana
        String encodedPassword = passwordEncoder.encode(newUser.getPasswordHash());
        newUser.setPasswordHash(encodedPassword);

        // Uudet käyttäjät eivät voi olla suoraan tutoreita yms.
        newUser.setRole("USER");
        newUser.setTutor(false);

        // Uudet käyttäjät eivät voi olla vanhempia rekisteröinnin yhteydessä.
        newUser.setParent(false);

        AppUser savedUser = repository.save(newUser);
        return savedUser;
    }
}
