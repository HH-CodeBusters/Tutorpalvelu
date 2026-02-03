package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



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
    
}
