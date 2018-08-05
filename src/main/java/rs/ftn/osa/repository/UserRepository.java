package rs.ftn.osa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ftn.osa.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);
}
