package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:5173")
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
    
}
