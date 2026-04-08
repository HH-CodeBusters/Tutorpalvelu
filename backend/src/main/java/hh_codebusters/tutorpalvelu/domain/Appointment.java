package hh_codebusters.tutorpalvelu.domain;
 
import jakarta.persistence.*;
import java.util.Set;

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

    public Long getId() {
        return id;
    }


    public String getStartTime() {
        return startTime;
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


    public AppUser getUser() {
        return user;
    }


    public void setUser(AppUser user) {
        this.user = user;
    }


    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    
    public String getUserEmail() {
    return user != null ? user.getEmail() : null;
}
}
