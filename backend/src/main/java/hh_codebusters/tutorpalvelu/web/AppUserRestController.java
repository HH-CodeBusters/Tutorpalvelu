package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.*;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class AppUserRestController {
    private AppUserRepository repository;

    public AppUserRestController(AppUserRepository repository) {
        this.repository = repository;
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
}
