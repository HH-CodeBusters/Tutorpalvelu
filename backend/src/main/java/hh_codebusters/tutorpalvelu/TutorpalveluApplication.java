package hh_codebusters.tutorpalvelu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import hh_codebusters.tutorpalvelu.domain.*;

@SpringBootApplication
public class TutorpalveluApplication {

	public static void main(String[] args) {
		SpringApplication.run(TutorpalveluApplication.class, args);
	}

	@Autowired
	private PasswordEncoder passwordEncode;
	@Bean
	public CommandLineRunner demo (AppUserRepository repository){
		return (args) -> {
			AppUser user1 = new AppUser("tuomo.tutor@gmail.com", passwordEncode.encode("Tuomo12345"),"TUTOR", "Tuomo", "Tutor", "+358415620247","Koulukatu 1 B 5", "00100", "Helsinki", "Male", "123234", "None", true, false);
			repository.save(user1);
			};
	}

}
