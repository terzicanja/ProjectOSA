package rs.ftn.osa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ftn.osa.entity.Post;
import rs.ftn.osa.repository.PostRepository;

@Service
public class PostService implements PostServiceInterface {
	
	@Autowired
	PostRepository postRepository;
	
	@Override
	public Post findOne(Integer postId) {
//		return postRepository.getOne(postId);
		return postRepository.findOne(postId);
	}
	
	@Override
	public List<Post> findAll(){
		return postRepository.findAll();
	}
	
	@Override
	public List<Post> findAllByOrderByDateDesc() {
		return postRepository.findAllByOrderByDateDesc();
	}

	@Override
	public List<Post> findAllByOrderByDateAsc() {
		return postRepository.findAllByOrderByDateAsc();
	}

	@Override
	public Post save(Post post) {
		return postRepository.save(post);
	}
	
	@Override
	public void remove(Integer id) {
		postRepository.delete(id);
	}
	
	@Override
    public List<Post> findAllBySearch(String text) {
        return postRepository.findAllBySearch(text);
    }

}
