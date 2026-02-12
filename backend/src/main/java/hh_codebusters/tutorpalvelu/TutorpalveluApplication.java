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
	public CommandLineRunner demo(AppUserRepository repository, SubjectRepository subjectRepository) {
		return (args) -> {
			Subject math = new Subject("Matematiikka");
			Subject physics = new Subject("Fysiikka");

			subjectRepository.save(math);
			subjectRepository.save(physics);

			Set<Subject> subjects = new HashSet<>();
			subjects.add(math);
			subjects.add(physics);

			AppUser user1 = new AppUser("tuomo.tutor@gmail.com", "$2a$10$b/pkWuFlnv52E0L2f3eqa./NZYSYcVNkn.5URY7YQhT8n.6yu0QPO", "TUTOR", "Tuomo", "Tutor",
					"+358415620247", "Koulukatu 1 B 5", "00100", "Helsinki", "Male", "120289-111N", null, true, false, subjects);
			repository.save(user1);
		};
	}
}


