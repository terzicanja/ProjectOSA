package rs.ftn.osa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ftn.osa.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
	
	Authority findByName(String name);

}
