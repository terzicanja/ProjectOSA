package rs.ftn.osa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ftn.osa.entity.Authority;
import rs.ftn.osa.repository.AuthorityRepository;

@Service
public class AuthorityService implements AuthorityServiceInterface {
	
	@Autowired
	AuthorityRepository authorityRepository;
	
	@Override
	public Authority findByName(String name) {
		return authorityRepository.findByName(name);
	}

}
