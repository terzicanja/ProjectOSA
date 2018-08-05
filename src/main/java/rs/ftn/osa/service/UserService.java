package rs.ftn.osa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ftn.osa.entity.User;
import rs.ftn.osa.repository.UserRepository;

@Service
public class UserService implements UserServiceInterface {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public User findByUsernameAndPassword(String username, String password) {
		User user = userRepository.findByUsername(username);
		if(user.getPassword().equals(password))
			return user;
		else
			return null;
	}
	
	@Override
	public User findOne(Integer userId) {
		return userRepository.getOne(userId);
	}
	
	@Override
	public List<User> findAll(){
		return userRepository.findAll();
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public User save(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public void remove(Integer id) {
//		userRepository.deleteById(id);
		userRepository.delete(id);
	}

}
