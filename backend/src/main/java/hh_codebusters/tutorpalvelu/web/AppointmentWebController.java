package hh_codebusters.tutorpalvelu.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import hh_codebusters.tutorpalvelu.domain.Appointment;
import hh_codebusters.tutorpalvelu.domain.AppointmentRepository;

@Controller
public class AppointmentWebController {

    private final AppointmentRepository appointmentRepository;

    public AppointmentWebController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @RequestMapping(value = "/appointments")
    public String appointments(Model model) {
        List<Appointment> allAppointments = appointmentRepository.findAll();
        model.addAttribute("appointments", allAppointments);
        return "appointments";
    }
}
