package rs.ftn.osa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ftn.osa.entity.Tag;
import rs.ftn.osa.repository.TagRepository;

@Service
public class TagService implements TagServiceInterface {
	
	@Autowired
	TagRepository tagRepository;
	
	@Override
	public Tag findOne(Integer tagId) {
		return tagRepository.getOne(tagId);
//		return tagRepository.findOne(tagId);
	}
	
	@Override
	public List<Tag> findAll(){
		return tagRepository.findAll();
	}
	
	@Override
	public List<Tag> findByPosts_Id(Integer postId){
		return tagRepository.findByPosts_Id(postId);
	}
	
	@Override
	public Tag save(Tag tag) {
		return tagRepository.save(tag);
	}
	
	@Override
	public void remove(Integer id) {
		tagRepository.delete(id);
//		tagRepository.delete(id);
	}

}
