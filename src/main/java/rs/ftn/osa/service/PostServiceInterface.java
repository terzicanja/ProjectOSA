package rs.ftn.osa.service;

import java.util.List;

import rs.ftn.osa.entity.Post;

public interface PostServiceInterface {
	
	Post findOne(Integer postId);
	
	List<Post> findAll();
	
	List<Post> findAllByOrderByDateDesc();
	
	List<Post> findAllByOrderByDateAsc();
	
	List<Post> findAllByOrderByLikesDesc();
	
	List<Post> findAllByOrderByDislikesDesc();
	
	Post save(Post post);
	
	void remove(Integer id);
	
	List<Post> findAllBySearch(String text);

}
