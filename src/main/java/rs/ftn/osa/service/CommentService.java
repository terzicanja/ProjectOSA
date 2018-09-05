package rs.ftn.osa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ftn.osa.entity.Comment;
import rs.ftn.osa.repository.CommentRepository;

@Service
public class CommentService implements CommentServiceInterface {
	
	@Autowired
	CommentRepository commentRepository;
	
	@Override
	public Comment findOne(Integer commentId) {
		return commentRepository.getOne(commentId);
	}
	
	@Override
	public List<Comment> findAll(){
		return commentRepository.findAll();
	}
	
	@Override
	public List<Comment> findByPost_Id(Integer postId){
		return commentRepository.findByPost_Id(postId);
	}
	
	@Override
    public List<Comment> findAllByPost_IdOrderByDate(Integer id) {
        return commentRepository.findAllByPost_IdOrderByDateDesc(id);
    }

    @Override
    public List<Comment> findAllByPost_IdOrderByLikes(Integer id) {
        return commentRepository.findAllByPost_IdOrderByLikesDesc(id);
    }

    @Override
    public List<Comment> findAllByPost_IdOrderByDislikes(Integer id) {
        return commentRepository.findAllByPost_IdOrderByDislikesDesc(id);
    }
	
	
	
	
	
	@Override
	public Comment save(Comment comment) {
		return commentRepository.save(comment);
	}
	
	@Override
	public void remove(Integer id) {
		commentRepository.delete(id);
	}

}
