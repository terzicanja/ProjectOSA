package rs.ftn.osa.service;

import java.util.List;

import rs.ftn.osa.entity.User;

public interface UserServiceInterface {
	
	User findByUsernameAndPassword(String username, String password);
	
	User findOne(Integer userId);
	
	User findByUsername(String username);
	
	List<User> findAll();
	
	User save(User user);
	
	void remove(Integer id);

}
