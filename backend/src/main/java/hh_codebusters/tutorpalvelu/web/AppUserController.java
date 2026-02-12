package hh_codebusters.tutorpalvelu.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import jakarta.validation.*;

import hh_codebusters.tutorpalvelu.domain.*;

@Controller
public class AppUserController {

	// @Autowired
	private AppUserRepository repository;

	public AppUserController(AppUserRepository repository) {
		this.repository = repository;
	}

	@RequestMapping(value = "/login")
	public String login() {
		return "login";
	}

	@RequestMapping(value = "/signup")
	public String addStudent(Model model) {
		model.addAttribute("signupform", new SignUpForm());
		return "signup";
	}

	@RequestMapping(value = "saveuser", method = RequestMethod.POST)
	public String save(@Valid @ModelAttribute("signupform") SignUpForm signupForm, BindingResult bindingResult) {
		if (!bindingResult.hasErrors()) { // validation errors
			if (signupForm.getPassword().equals(signupForm.getPasswordCheck())) { // check password match
				String pwd = signupForm.getPassword();
				BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
				String hashPwd = bc.encode(pwd);

				AppUser newUser = new AppUser();
				newUser.setPasswordHash(hashPwd);
				newUser.setEmail(signupForm.getEmail());
				newUser.setRole("USER");
				if (repository.findByEmail(signupForm.getEmail()) == null) { // Check if user exists
					repository.save(newUser);
				} else {
					bindingResult.rejectValue("username", "err.username", "Username already exists");
					return "signup";
				}
			} else {
				bindingResult.rejectValue("passwordCheck", "err.passCheck", "Passwords does not match");
				return "signup";
			}
		} else {
			return "signup";
		}
		return "redirect:/login";
	}
}
