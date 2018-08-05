package rs.ftn.osa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ftn.osa.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {
	
	List<Tag> findByPosts_Id(Integer postId);
}
