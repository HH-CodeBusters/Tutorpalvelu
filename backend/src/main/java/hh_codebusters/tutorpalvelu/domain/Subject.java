package hh_codebusters.tutorpalvelu.domain;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectname;

    @ManyToMany(mappedBy = "subjects")
    private Set<AppUser> tutors;

    public Subject() {
    }

    public Subject(String subjectname) {
        this.subjectname = subjectname;
    }

    public Long getId() {
        return id;
    }

    public String getSubjectname() {
        return subjectname;
    }

    public void setSubjectname(String subjectname) {
        this.subjectname = subjectname;
    }

    public Set<AppUser> getTutors() {
        return tutors;
    }

    public void setTutors(Set<AppUser> tutors) {
        this.tutors = tutors;
    }
}