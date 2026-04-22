package hh_codebusters.tutorpalvelu.web;

import hh_codebusters.tutorpalvelu.domain.*;

import java.util.List;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class AppUserRestController {
    private AppUserRepository repository;
    private SubjectRepository subjectRepository;
    private PasswordEncoder passwordEncoder;

    public AppUserRestController(AppUserRepository repository, SubjectRepository subjectRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.subjectRepository = subjectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/tutors")
    public List<AppUser> tutorListRest(boolean tutor) {
        return (List<AppUser>) repository.findByTutorTrue(tutor);
    }
    @GetMapping("/students")
    public List<AppUser> getStudents() {
        return (List<AppUser>) repository.findByTutorFalseAndParentFalse();
    }
    @GetMapping("/parents")
    public List<AppUser> getParents() {
        return (List<AppUser>) repository.findByParentTrue();
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

    @PutMapping("/users/current")
    public AppUser updateCurrentUser(@RequestBody AppUser updatedUserData) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        
        String email = authentication.getName();
        AppUser user = repository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        
        // Update allowed fields (everything except email and password)
        if (updatedUserData.getFirstname() != null) {
            user.setFirstname(updatedUserData.getFirstname());
        }
        if (updatedUserData.getLastname() != null) {
            user.setLastname(updatedUserData.getLastname());
        }
        if (updatedUserData.getPhone() != null) {
            user.setPhone(updatedUserData.getPhone());
        }
        if (updatedUserData.getAddress() != null) {
            user.setAddress(updatedUserData.getAddress());
        }
        if (updatedUserData.getZipcode() != null) {
            user.setZipcode(updatedUserData.getZipcode());
        }
        if (updatedUserData.getCity() != null) {
            user.setCity(updatedUserData.getCity());
        }
        if (updatedUserData.getGender() != null) {
            user.setGender(updatedUserData.getGender());
        }
        if (updatedUserData.getSchool() != null) {
            user.setSchool(updatedUserData.getSchool());
        }
        
        // Update subjects if user is a tutor
        if (user.getTutor() && updatedUserData.getSubjects() != null) {
            Set<Subject> subjects = new HashSet<>();
            for (Subject subject : updatedUserData.getSubjects()) {
                if (subject.getId() != null && subject.getId() > 0) {
                    // Load existing subject by ID
                    Subject existingSubject = subjectRepository.findById(subject.getId()).orElse(null);
                    if (existingSubject != null) {
                        subjects.add(existingSubject);
                    }
                } else if (subject.getSubjectname() != null && !subject.getSubjectname().isEmpty()) {
                    // Try to find existing subject by name first
                    Subject existingSubject = subjectRepository.findBySubjectname(subject.getSubjectname());
                    if (existingSubject != null) {
                        subjects.add(existingSubject);
                    } else {
                        // Create and save new subject if it doesn't exist
                        Subject newSubject = new Subject(subject.getSubjectname());
                        Subject savedSubject = subjectRepository.save(newSubject);
                        subjects.add(savedSubject);
                    }
                }
            }
            user.setSubjects(subjects);
        }
        
        AppUser savedUser = repository.save(user);
        return savedUser;
    }

    @GetMapping("/subjects")
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
}
