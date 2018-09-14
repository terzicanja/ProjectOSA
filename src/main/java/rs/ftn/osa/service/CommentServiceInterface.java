package rs.ftn.osa.service;

import java.util.List;

import rs.ftn.osa.entity.Comment;

public interface CommentServiceInterface {
	
	Comment findOne(Integer id);
	
	List<Comment> findAll();
	
	List<Comment> findByPost_Id(Integer postId);
	List<Comment> findAllByPost_IdOrderByDateAsc(Integer id);
	List<Comment> findAllByPost_IdOrderByDateDesc(Integer id);
    List<Comment> findAllByPost_IdOrderByLikes(Integer id);
    List<Comment> findAllByPost_IdOrderByDislikes(Integer id);
	
	Comment save(Comment comment);
	
	void remove(Integer id);

}
