package hh_codebusters.tutorpalvelu;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import hh_codebusters.tutorpalvelu.domain.*;

@SpringBootApplication
public class TutorpalveluApplication {

	public static void main(String[] args) {
		SpringApplication.run(TutorpalveluApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(AppUserRepository repository, SubjectRepository subjectRepository,
			AppointmentRepository appointmentRepository) {
		return (args) -> {

			if (repository.count() == 0 && subjectRepository.count() == 0) {

				Subject math = new Subject("Matematiikka");
				Subject physics = new Subject("Fysiikka");

				subjectRepository.save(math);
				subjectRepository.save(physics);

				Set<Subject> subjects = new HashSet<>();
				subjects.add(math);
				subjects.add(physics);

				AppUser user1 = new AppUser("tuomo.tutor@gmail.com",
						"$2a$10$b/pkWuFlnv52E0L2f3eqa./NZYSYcVNkn.5URY7YQhT8n.6yu0QPO", "TUTOR", "Tuomo", "Tutor",
						"+358415620247", "Koulukatu 1 B 5", "00100", "Helsinki", "Male", "ei koulua", true, false,
						subjects);
				repository.save(user1);

				Appointment appointment1 = new Appointment();

				appointment1.setStartTime("2024-10-01T10:00");
				appointment1.setEndTime("2024-10-01T11:00");

				Set<AppUser> users = new HashSet<>();
				users.add(user1);

				appointment1.setUsers(users);

				appointmentRepository.save(appointment1);
			}
		};
	}
}
