package hh_codebusters.tutorpalvelu;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import hh_codebusters.tutorpalvelu.domain.*;

@SpringBootTest
class TutorpalveluApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void addNewUser() {
		// Testataan uuden käyttäjän luomista
		AppUser user = new AppUser();
		user.setEmail("testuser@mail.com");
		user.setPasswordHash("password");
		user.setFirstname("Test");
		user.setLastname("User");
		user.setRole("USER");
		user.setPhone("+358415620247");
		user.setAddress("Koulukatu 1 B 5");
		user.setZipcode("00100");
		user.setCity("Helsinki");
		user.setGender("Male");
		user.setSchool("Helsingin lukio");
		user.setTutor(false);
		user.setParent(false);

		// Varmistetaan, että käyttäjään on asetettu oikeat arvot
		assert user.getEmail().equals("testuser@mail.com");
		assert user.getPasswordHash().equals("password");
		assert user.getFirstname().equals("Test");
		assert user.getLastname().equals("User");
		assert user.getRole().equals("USER");
		assert user.getPhone().equals("+358415620247");
		assert user.getAddress().equals("Koulukatu 1 B 5");
		assert user.getZipcode().equals("00100");
		assert user.getCity().equals("Helsinki");
		assert user.getGender().equals("Male");
		assert user.getSchool().equals("Helsingin lukio");
		assert user.isTutor() == false;
		assert user.isParent() == false;

	}

	


}
