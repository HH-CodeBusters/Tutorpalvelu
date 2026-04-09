package hh_codebusters.tutorpalvelu.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import hh_codebusters.tutorpalvelu.domain.*;

@RestController
@RequestMapping("/api")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final AppUserRepository userRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
            AppUserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/appointments")
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }
}