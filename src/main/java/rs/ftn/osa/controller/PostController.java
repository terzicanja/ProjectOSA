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

import rs.ftn.osa.dto.PostDTO;
import rs.ftn.osa.dto.TagDTO;
import rs.ftn.osa.entity.Post;
import rs.ftn.osa.entity.Tag;
import rs.ftn.osa.entity.User;
import rs.ftn.osa.service.PostServiceInterface;
import rs.ftn.osa.service.TagServiceInterface;
import rs.ftn.osa.service.UserServiceInterface;

@RestController
@RequestMapping(value = "api/posts")
public class PostController {
	
	@Autowired
	private PostServiceInterface postService;
	
	@Autowired
	private UserServiceInterface userService;
	
	@Autowired
	private TagServiceInterface tagService;
	
	
	@GetMapping
	public ResponseEntity<List<PostDTO>> getPosts(){
		List<Post> posts = postService.findAll();
		List<PostDTO> postsDTO = new ArrayList<PostDTO>();
		for(Post p : posts) {
			postsDTO.add(new PostDTO(p));
		}
		return new ResponseEntity<List<PostDTO>>(postsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/search/{text}")
    public ResponseEntity<List<PostDTO>> getPostSearched(@PathVariable("text") String text){
        List<Post> posts = postService.findAllBySearch(text);

        List<PostDTO> postDTOS = new ArrayList<>();
        for (Post post : posts) {
            postDTOS.add(new PostDTO(post));
        }
        return new ResponseEntity<List<PostDTO>>(postDTOS, HttpStatus.OK);
    }
	
	
	@GetMapping(value = "/sort/date/asc")
	public ResponseEntity<List<PostDTO>> getPostsDateAsc(){
		List<Post> posts = postService.findAllByOrderByDateAsc();
		List<PostDTO> postsDTO = new ArrayList<PostDTO>();
		for(Post p : posts) {
			postsDTO.add(new PostDTO(p));
		}
		return new ResponseEntity<List<PostDTO>>(postsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/sort/date/desc")
	public ResponseEntity<List<PostDTO>> getPostsDateDesc(){
		List<Post> posts = postService.findAllByOrderByDateDesc();
		List<PostDTO> postsDTO = new ArrayList<PostDTO>();
		for(Post p : posts) {
			postsDTO.add(new PostDTO(p));
		}
		return new ResponseEntity<List<PostDTO>>(postsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<PostDTO> getPost(@PathVariable("id") Integer id){
		Post post = postService.findOne(id);
		if(post == null) {
			return new ResponseEntity<PostDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<PostDTO>(new PostDTO(post), HttpStatus.OK);
	}
	
	
	@GetMapping(value = "tags/{id}")
    public ResponseEntity<List<TagDTO>> getTagByPost(@PathVariable("id") Integer id){
        List<Tag> tags = tagService.findByPosts_Id(id);
        List<TagDTO> tagDTOS = new ArrayList<>();
        if(tags == null)
            return new ResponseEntity<List<TagDTO>>(HttpStatus.NOT_FOUND);
        else {
            for (Tag t : tags)
                tagDTOS.add(new TagDTO(t));
        }
        return new ResponseEntity<List<TagDTO>>(tagDTOS, HttpStatus.OK);
    }
	
	
	@PostMapping(value = "/create", consumes = "application/json")
	public ResponseEntity<PostDTO> savePost(@RequestBody PostDTO postDTO){
		Post post = new Post();
		User u1 = new User();
		u1.setId(2);
//		u1.setName("test");
//		u1.setUsername("test1");
		
		Date d = new Date();
		post.setDate(d);
		post.setTitle(postDTO.getTitle());
		post.setDescription(postDTO.getDescription());
//		post.setPhoto(postDTO.getPhoto());
		post.setPhoto("");
//		post.setDate(postDTO.getDate());
		post.setLikes(postDTO.getLikes());
		post.setDislikes(postDTO.getDislikes());
		post.setLongitude(postDTO.getLongitude());
		post.setLatitude(postDTO.getLatitude());
//		post.setUser(u1);
		post.setUser(userService.findOne(postDTO.getUser().getId()));
//		post.setUser(userService.findByUsername(postDTO.getUser().getUsername()));
		
		post = postService.save(post);
		return new ResponseEntity<PostDTO>(new PostDTO(post), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO postDTO, @PathVariable("id") Integer id){
		Post post = postService.findOne(id);
		if(post == null) {
			return new ResponseEntity<PostDTO>(HttpStatus.BAD_REQUEST);
		}
		
		post.setTitle(postDTO.getTitle());
		post.setDescription(postDTO.getDescription());
		post.setPhoto(postDTO.getPhoto());
		post.setDate(postDTO.getDate());
		post.setLikes(postDTO.getLikes());
		post.setDislikes(postDTO.getDislikes());
		post.setLongitude(postDTO.getLongitude());
		post.setLatitude(postDTO.getLatitude());
		post.setUser(userService.findOne(postDTO.getUser().getId()));
		
		post = postService.save(post);
		return new ResponseEntity<PostDTO>(new PostDTO(post), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/upvote/{id}", consumes = "application/json")
	public ResponseEntity<PostDTO> upvotePost(@RequestBody PostDTO postDTO, @PathVariable("id") Integer id){
		Post post = postService.findOne(id);
		if(post == null) {
			return new ResponseEntity<PostDTO>(HttpStatus.BAD_REQUEST);
		}
		
//		post.setTitle(postDTO.getTitle());
//		post.setDescription(postDTO.getDescription());
//		post.setPhoto(postDTO.getPhoto());
//		post.setDate(postDTO.getDate());
		post.setLikes(post.getLikes() + 1);
//		post.setDislikes(postDTO.getDislikes());
//		post.setLongitude(postDTO.getLongitude());
//		post.setLatitude(postDTO.getLatitude());
//		post.setUser(userService.findOne(postDTO.getUser().getId()));
		
		post = postService.save(post);
		return new ResponseEntity<PostDTO>(new PostDTO(post), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/downvote/{id}", consumes = "application/json")
	public ResponseEntity<PostDTO> downvotePost(@RequestBody PostDTO postDTO, @PathVariable("id") Integer id){
		Post post = postService.findOne(id);
		if(post == null) {
			return new ResponseEntity<PostDTO>(HttpStatus.BAD_REQUEST);
		}
		
//		post.setTitle(postDTO.getTitle());
//		post.setDescription(postDTO.getDescription());
//		post.setPhoto(postDTO.getPhoto());
//		post.setDate(postDTO.getDate());
//		post.setLikes(post.getLikes() + 1);
		post.setDislikes(post.getDislikes() + 1);
//		post.setLongitude(postDTO.getLongitude());
//		post.setLatitude(postDTO.getLatitude());
//		post.setUser(userService.findOne(postDTO.getUser().getId()));
		
		post = postService.save(post);
		return new ResponseEntity<PostDTO>(new PostDTO(post), HttpStatus.CREATED);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deletePost(@PathVariable("id") Integer id){
		Post post = postService.findOne(id);
		if(post != null) {
			postService.remove(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

}
