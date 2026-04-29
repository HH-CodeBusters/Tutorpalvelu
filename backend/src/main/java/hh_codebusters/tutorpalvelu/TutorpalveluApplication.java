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
				Subject chemistry = new Subject("Kemia");
				Subject programming = new Subject("Ohjelmointi");
				Subject history = new Subject("Historia");
				Subject english = new Subject("Englanti");
				Subject finnish = new Subject("Suomi");
				Subject swedish = new Subject("Ruotsi");
				Subject geography = new Subject("Maantiede");
				Subject biology = new Subject("Biologia");
				Subject music = new Subject("Musiikki");
				Subject art = new Subject("Kuvataide");
				Subject psykology = new Subject("Psykologia");


				subjectRepository.save(math);
				subjectRepository.save(physics);
				subjectRepository.save(chemistry);
				subjectRepository.save(programming);
				subjectRepository.save(history);
				subjectRepository.save(english);
				subjectRepository.save(finnish);
				subjectRepository.save(swedish);
				subjectRepository.save(geography);
				subjectRepository.save(biology);
				subjectRepository.save(music);
				subjectRepository.save(art);
				subjectRepository.save(psykology);
				

				Set<Subject> subjects = new HashSet<>();
				subjects.add(math);
				subjects.add(physics);

				Set<Subject> subjects2 = new HashSet<>();
				subjects2.add(english);
				subjects2.add(history);
				subjects2.add(finnish);

				Set<Subject> subjects3 = new HashSet<>();
				subjects3.add(programming);
				subjects3.add(physics);
				subjects3.add(chemistry);
				subjects3.add(math);

				Set<Subject> subjects4 = new HashSet<>();
				subjects4.add(geography);
				subjects4.add(biology);
				subjects4.add(psykology);
				subjects4.add(history);

				Set<Subject> subjects5 = new HashSet<>();
				subjects5.add(music);
				subjects5.add(art);
				subjects5.add(psykology);

				Set<Subject> subjects6 = new HashSet<>();
				subjects6.add(english);
				subjects6.add(swedish);
				subjects6.add(finnish);


				AppUser user1 = new AppUser("tuomo.tutor@gmail.com",
						"$2a$10$b/pkWuFlnv52E0L2f3eqa./NZYSYcVNkn.5URY7YQhT8n.6yu0QPO", "TUTOR", "Tuomo", "Tutor",
						"+358415620247", "Koulukatu 1 B 5", "00100", "Helsinki", "Male", "ei koulua", true, false,
						subjects);
				repository.save(user1);

				AppUser user2 = new AppUser("onni.opiskelija@gmail.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "STUDENT", "Onni",
						"Opiskelija",
						"+358415620248", "Opintokatu 2 B 5", "00100", "Helsinki", "Male", "Perälän Ala-aste", false,
						false, subjects);
				repository.save(user2);

				AppUser user3 = new AppUser("vanhempi.faijataimutsi@gmail.com", "$2a$10$aX0F3E07vWhhK./UwCwU8OMzDduwP9m0pOsrsOcgYr3R58R7Al9Hi", "PARENT", "Vanhempi", "Faijataimutsi",
						"+358415620249", "Opintokatu 2 B 5", "00100", "Helsinki", "Male", "Perälän Ala-aste", false, true, subjects);
				repository.save(user3);

				AppUser user4 = new AppUser("timo@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Timo",
						"Tutor",
						"+358415620250", "Keskuskatu 1 B 5", "00100", "Helsinki", "Male", "ei koulua", true, false,
						subjects2);
				repository.save(user4);

				AppUser user5 = new AppUser("kaisa@mail.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Kaisa",
						"Tutor",
						"+358415620251", "Koulukatu 1 B 2", "00100", "Helsinki", "Female", "ei koulua", true, false,
						subjects5);
				repository.save(user5);

				AppUser user6 = new AppUser("lasse@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Lasse",
						"Tutor",
						"+358415620252", "Virastotie 1 A 3", "00100", "Helsinki", "Male", "ei koulua", true, false,
						subjects);
				repository.save(user6);

				AppUser user7 = new AppUser("miika@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Miika",
						"Tutor",
						"+358415620253", "Opintokatu 8 C 4", "00100", "Helsinki", "Male", "ei koulua", true, false,
						subjects);
				repository.save(user7);

				AppUser user8 = new AppUser("anta@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Anta",
						"Tutor",
						"+358415620254", "Koulukatu 1 B 5", "00100", "Helsinki", "Female", "ei koulua", true, false,
						subjects4);
				repository.save(user8);

				AppUser user9 = new AppUser("sari@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Sari",
						"Tutor",
						"+358415620255", "Testikatu 1 A 3", "00100", "Helsinki", "Female", "ei koulua", true, false,
						subjects6);
				repository.save(user9);

				AppUser user10 = new AppUser("maria@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Maria",
						"Tutor",
						"+358415620256", "Viimakuja 1 C 7", "00100", "Helsinki", "Female", "ei koulua", true, false,
						subjects2);
				repository.save(user10);

				AppUser user11 = new AppUser("anna@example.com", "$2a$10$7XS4pJ32BwCucL1YFGsMLuUU/kDHw2wFSa9jR5/9YR0i0l34mSsta", "TUTOR", "Anna",
						"Tutor",
						"+358415620257", "Koulukatu 1 B 8", "00100", "Helsinki", "Female", "ei koulua", true, false,
						subjects5);
				repository.save(user11);

Appointment appointment1 = new Appointment();
 
                appointment1.setTitle("Matematiikka tutorointi");
                appointment1.setStart("2024-10-01T10:00:00");
                appointment1.setEnd("2024-10-01T11:00:00");
                Set<AppUser> users = new HashSet<>();
                users.add(user1);
                users.add(user2);
 
                appointment1.setUsers(users);
 
                appointmentRepository.save(appointment1);
 
			}
		};
	}
}

//Tuomo12345
//OnniOp123
//Vanhempi1234

