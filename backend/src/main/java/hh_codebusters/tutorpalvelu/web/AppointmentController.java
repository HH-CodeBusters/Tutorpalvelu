package hh_codebusters.tutorpalvelu.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

    @PostMapping("/appointments")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        System.out.println("👉 DELETE called with id: " + id);

        try {
            if (!appointmentRepository.existsById(id)) {
                System.out.println("❌ ID not found");
                return ResponseEntity.status(404).body("Not found");
            }

            appointmentRepository.deleteById(id);

            System.out.println("✅ Deleted successfully");
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            System.out.println("🔥 ERROR DURING DELETE:");
            e.printStackTrace(); // 👈 THIS IS KEY
            return ResponseEntity.status(500).body("Delete failed");
        }
    }
}