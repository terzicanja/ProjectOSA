package rs.ftn.osa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ftn.osa.entity.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	List<Post> findAllByOrderByDateDesc();
	
	List<Post> findAllByOrderByDateAsc();
	
}
