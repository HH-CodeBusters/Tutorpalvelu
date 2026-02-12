package hh_codebusters.tutorpalvelu;

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
public CommandLineRunner demo(AppUserRepository repository) {
    return (args) -> {

        AppUser user = new AppUser(null, "email", "pass", "ROLE_USER",
            "John", "Doe",
            "0401234567", "Street 1", "00100", "Helsinki",
            "Male", "123456-789A", "Haaga-Helia",
            true, false);

        repository.save(user);
    };
}
}


