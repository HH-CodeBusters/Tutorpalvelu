package hh_codebusters.tutorpalvelu.service;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hh_codebusters.tutorpalvelu.domain.*;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
//@Autowired
	AppUserRepository repository;

    // Constructor Injection
	public UserDetailServiceImpl(AppUserRepository AppUserRepository) {
		this.repository = AppUserRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		AppUser curruser = repository.findByEmail(email);
        UserDetails user = new org.springframework.security.core.userdetails.User(email, curruser.getPasswordHash(), 
        		AuthorityUtils.createAuthorityList(curruser.getRole()));
        return user;
    } 
}
