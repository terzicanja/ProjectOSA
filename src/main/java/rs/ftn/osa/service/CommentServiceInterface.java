package rs.ftn.osa.service;

import java.util.List;

import rs.ftn.osa.entity.Comment;

public interface CommentServiceInterface {
	
	Comment findOne(Integer id);
	
	List<Comment> findAll();
	
	List<Comment> findByPost_Id(Integer postId);
	
	Comment save(Comment comment);
	
	void remove(Integer id);

}
