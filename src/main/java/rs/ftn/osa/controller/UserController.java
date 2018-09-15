package rs.ftn.osa.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import rs.ftn.osa.dto.UserDTO;
import rs.ftn.osa.entity.Authority;
import rs.ftn.osa.entity.User;
import rs.ftn.osa.service.AuthorityServiceInterface;
import rs.ftn.osa.service.UserServiceInterface;

@RestController
@RequestMapping(value = "api/users")
public class UserController {
	
	@Autowired
	private UserServiceInterface userService;
	
	@Autowired
    AuthorityServiceInterface authorityServiceInterface;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	
//	@RequestMapping("/whoami")
	@GetMapping(value = "/whoami")
    public ResponseEntity<UserDTO> user(Principal user) {
		User logged = userService.findByUsername(user.getName());
		
		return new ResponseEntity<>(new UserDTO(logged), HttpStatus.OK);
//        return this.userService.findByUsername(user.getName());
    }
	
	@GetMapping
	public ResponseEntity<List<UserDTO>> getUsers(){
		List<User> users = userService.findAll();
		List<UserDTO> usersDTO = new ArrayList<UserDTO>();
		for(User u : users) {
			usersDTO.add(new UserDTO(u));
		}
		return new ResponseEntity<List<UserDTO>>(usersDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable("id") Integer id){
		User user = userService.findOne(id);
		if(user == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.OK);
	}
	
	@GetMapping(value = "/get/role/{username}")
    public ResponseEntity<Authority> getRole(@PathVariable String username){
        User user = userService.findByUsername(username);
        String role = user.getUser_authorities().iterator().next().getName();
        Authority authority = authorityServiceInterface.findByName(role);
        return new ResponseEntity<Authority>(authority,HttpStatus.OK);
    }
	
	
	@GetMapping(value = "/find/{username}")
	public ResponseEntity<UserDTO> getUserByUsername(@PathVariable("username") String username){
		User user = userService.findByUsername(username);
		System.out.println("fdsfsfgssfsf");
		if(user == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.OK);
	}
	
	
	@PostMapping(value = "/create", consumes = "application/json")
	public ResponseEntity<UserDTO> saveUser(@RequestBody UserDTO userDTO){
		User user = new User();
//		user.setName(userDTO.getName());
		user.setName(userDTO.getName());
		user.setUsername(userDTO.getUsername());
		BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
		user.setPassword(bc.encode(userDTO.getPassword()));
		
//		User u = userService.findByUsername(username);
		Authority authority = authorityServiceInterface.findByName("ROLE_COMMENTATOR");
		user.getUser_authorities().add(authority);
		
		System.out.println("ovde pravim novog usera i ovo su podaci: " + userDTO.getUsername() + "i sifra" + userDTO.getPassword());
		
		user = userService.save(user);
		return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.CREATED);
	}
	
	@PostMapping(value = "/photo")
	public ResponseEntity<Void> saveUserPhoto(@RequestParam("id") Integer id, @RequestParam("photo") MultipartFile photo){
		User u = userService.findOne(id);
		try {
			u.setPhoto(photo.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		u = userService.save(u);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
	@PostMapping(value = "/role/{username}/{role}")
	public ResponseEntity<Void> updateRole(@PathVariable("username") String username, @PathVariable("role") String role){
		User u = userService.findByUsername(username);
//		try {
//			u.setPhoto(photo.getBytes());
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		Authority authority = authorityServiceInterface.findByName(role);
		if(u.getUser_authorities().size() >0) {
            u.getUser_authorities().clear();
            u.getUser_authorities().add(authority);
            userService.save(u);
        }else{
            u.getUser_authorities().add(authority);
            userService.save(u);
        }
		
//		Authority authority = authorityServiceInterface.findByName(role);
//		u.getUser_authorities().add(authority);
//		u = userService.save(u);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, @PathVariable("id") String id){
		User user = userService.findByUsername(id);
		if(user == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.BAD_REQUEST);
		}
		
		user.setName(userDTO.getName());
//		user.setUsername(userDTO.getUsername());
		BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
		user.setPassword(bc.encode(userDTO.getPassword()));
//		user.setPassword(userDTO.getPassword());
//		user.setPhoto(userDTO.getPhoto());
		
		user = userService.save(user);
		return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.CREATED);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer id){
		User user = userService.findOne(id);
		if(user != null) {
			userService.remove(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

}
