package rs.ftn.osa.service;

import java.util.List;

import rs.ftn.osa.entity.Tag;

public interface TagServiceInterface {
	
	Tag findOne(Integer tagId);
	
	List<Tag> findAll();
	
	List<Tag> findByPosts_Id(Integer postId);
	
	Tag save(Tag tag);
	
	void remove(Integer id);

}
