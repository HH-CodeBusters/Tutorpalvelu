package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.AppUserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AppUserRestController {
    private final AppUserRepository = repository;

    public AppUserRestController(AppUserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/tutors")
    public String tutorListRest() {
        return (List<AppUser>) repository.findByIsTutor();
    }
    
}
