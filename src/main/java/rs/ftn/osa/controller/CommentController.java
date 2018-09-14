package rs.ftn.osa.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.fabric.xmlrpc.base.Data;

import rs.ftn.osa.dto.CommentDTO;
import rs.ftn.osa.entity.Comment;
import rs.ftn.osa.entity.Post;
import rs.ftn.osa.entity.User;
import rs.ftn.osa.service.CommentServiceInterface;
import rs.ftn.osa.service.PostServiceInterface;
import rs.ftn.osa.service.UserServiceInterface;

@RestController
@RequestMapping(value = "api/comments")
public class CommentController {
	
	@Autowired
	private CommentServiceInterface commentService;
	
	@Autowired
	private UserServiceInterface userService;
	
	@Autowired
	private PostServiceInterface postService;
	
	@GetMapping
	public ResponseEntity<List<CommentDTO>> getComments(){
		List<Comment> comments = commentService.findAll();
		List<CommentDTO> commentsDTO = new ArrayList<>();
		for(Comment c : comments) {
			commentsDTO.add(new CommentDTO(c));
		}
		return new ResponseEntity<List<CommentDTO>>(commentsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CommentDTO> getComment(@PathVariable("id") Integer id){
		Comment comment = commentService.findOne(id);
		if(comment == null) {
			return new ResponseEntity<CommentDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<CommentDTO>(new CommentDTO(comment), HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/post/{id}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable("id")Integer id){
        List<Comment> comments = commentService.findByPost_Id(id);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for (Comment comment : comments) {
            commentDTOS.add(new CommentDTO(comment));
        }
        return new ResponseEntity<List<CommentDTO>>(commentDTOS, HttpStatus.OK);
    }
	
	@GetMapping(value = "/post/order/{id}/{orderBy}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostOrdered(@PathVariable("id")Integer id,@PathVariable("orderBy") String orderBy){
        List<Comment> comments = null;
        if(orderBy.equals("newest")){
            comments = commentService.findAllByPost_IdOrderByDateDesc(id);
        }else if(orderBy.equals("oldest")){
            comments = commentService.findAllByPost_IdOrderByDateAsc(id);
        }else if(orderBy.equals("mostPopular")){
            comments = commentService.findAllByPost_IdOrderByLikes(id);
        }else if(orderBy.equals("leastPopular")){
            comments = commentService.findAllByPost_IdOrderByDislikes(id);
        }
        List<CommentDTO>commentDTOS = new ArrayList<>();
        for (Comment comment:comments) {
            commentDTOS.add(new CommentDTO(comment));
        }

        return new ResponseEntity<List<CommentDTO>>(commentDTOS, HttpStatus.OK);
    }
	
	
	
	
	
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<CommentDTO> saveComment(@RequestBody CommentDTO commentDTO){
		Comment comment = new Comment();
		User u1 = new User();
		u1.setId(2);
		Post p1 = new Post();
		p1.setId(1);
		Post p = postService.findOne(commentDTO.getPost().getId());
		
		
		comment.setTitle(commentDTO.getTitle());
		comment.setDescription(commentDTO.getDescription());
		//msm da vamo treba staviti trenutno vreme
		Date d = new Date();
		comment.setDate(d);
		comment.setLikes(0);
		comment.setDislikes(0);
//		comment.setPost(postService.findOne(commentDTO.getPost().getId()));
		comment.setUser(userService.findOne(commentDTO.getUser().getId()));
//		comment.setUser(u1);
		comment.setPost(p);
		
		comment = commentService.save(comment);
		return new ResponseEntity<CommentDTO>(new CommentDTO(comment), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<CommentDTO> updateComment(@RequestBody CommentDTO commentDTO, @PathVariable("id") Integer id){
		Comment comment = commentService.findOne(id);
		if(comment == null) {
			return new ResponseEntity<CommentDTO>(HttpStatus.BAD_REQUEST);
		}
		
//		comment.setTitle(commentDTO.getTitle());
		comment.setDescription(commentDTO.getDescription());
		//msm da vamo treba staviti trenutno vreme
//		comment.setDate(commentDTO.getDate());
//		comment.setLikes(commentDTO.getLikes());
//		comment.setLikes(comment.getLikes() + 1);
//		comment.setDislikes(commentDTO.getDislikes());
//		comment.setPost(postService.findOne(commentDTO.getPost().getId()));
//		comment.setUser(userService.findOne(commentDTO.getUser().getId()));
		
		comment = commentService.save(comment);
		return new ResponseEntity<CommentDTO>(new CommentDTO(comment), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/upvote/{id}", consumes = "application/json")
	public ResponseEntity<CommentDTO> upvoteComment(@RequestBody CommentDTO commentDTO, @PathVariable("id") Integer id){
		Comment comment = commentService.findOne(id);
		if(comment == null) {
			return new ResponseEntity<CommentDTO>(HttpStatus.BAD_REQUEST);
		}
		
		comment.setLikes(comment.getLikes() + 1);
		
		comment = commentService.save(comment);
		return new ResponseEntity<CommentDTO>(new CommentDTO(comment), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/downvote/{id}", consumes = "application/json")
	public ResponseEntity<CommentDTO> downvoteComment(@RequestBody CommentDTO commentDTO, @PathVariable("id") Integer id){
		Comment comment = commentService.findOne(id);
		if(comment == null) {
			return new ResponseEntity<CommentDTO>(HttpStatus.BAD_REQUEST);
		}
		
		comment.setDislikes(comment.getDislikes() + 1);
		
		comment = commentService.save(comment);
		return new ResponseEntity<CommentDTO>(new CommentDTO(comment), HttpStatus.CREATED);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteComment(@PathVariable("id") Integer id){
		Comment comment = commentService.findOne(id);
		if(comment != null) {
			commentService.remove(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

}
