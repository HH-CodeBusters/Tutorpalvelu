package hh_codebusters.tutorpalvelu.domain;
 
import jakarta.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import hh_codebusters.tutorpalvelu.domain.AppUser;


@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startTime;
    private String endTime;

    @ManyToMany
    @JoinTable(
    name = "appointment_users",
    joinColumns = @JoinColumn(name = "appointment_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id")
)
private Set<AppUser> users;
    public Long getId() {
        return id;
    }


    public String getStartTime() {
        return startTime;
    }


    public Set<AppUser> getUsers() {
        return users;
    }


    public void setUsers(Set<AppUser> users) {
        this.users = users;
    }


    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }


    public String getEndTime() {
        return endTime;
    }


    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }


    


    
    public Set<String> getUserEmails() {
    return users.stream()
            .map(AppUser::getEmail)
            .collect(Collectors.toSet());
}
}
