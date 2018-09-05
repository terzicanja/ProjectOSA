package rs.ftn.osa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ftn.osa.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	List<Comment> findByPost_Id(Integer postId);
	
	List<Comment> findAllByPost_IdOrderByDateDesc(Integer id);
    List<Comment> findAllByPost_IdOrderByLikesDesc(Integer id);
    List<Comment> findAllByPost_IdOrderByDislikesDesc(Integer id);
	
}
