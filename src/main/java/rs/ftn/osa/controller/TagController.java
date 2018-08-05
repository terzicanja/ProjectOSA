package rs.ftn.osa.controller;

import java.util.ArrayList;
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

import rs.ftn.osa.dto.TagDTO;
import rs.ftn.osa.entity.Tag;
import rs.ftn.osa.service.TagServiceInterface;

@RestController
@RequestMapping(value = "api/tags")
public class TagController {
	
	@Autowired
	private TagServiceInterface tagService;
	
	
	@GetMapping
	public ResponseEntity<List<TagDTO>> getTags(){
		List<Tag> tags = tagService.findAll();
		List<TagDTO> commentsDTO = new ArrayList<>();
		for(Tag c : tags) {
			commentsDTO.add(new TagDTO(c));
		}
		return new ResponseEntity<List<TagDTO>>(commentsDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<TagDTO> getTag(@PathVariable("id") Integer id){
		Tag tag = tagService.findOne(id);
		if(tag == null) {
			return new ResponseEntity<TagDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<TagDTO>(new TagDTO(tag), HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/tagbypost/{id}")
    public ResponseEntity<List<TagDTO>>getTagsByPost(@PathVariable("id") Integer id){
    	System.out.println("prvi korak");
        List<Tag> tags = tagService.findByPosts_Id(id);
        System.out.println("drugi korak");
        List<TagDTO>tagDTOS=new ArrayList<>();
        System.out.println("trazi tagoveeeeeeeeeee");
        if(tags == null)
            return  new ResponseEntity<List<TagDTO>>(HttpStatus.NOT_FOUND);
        for(Tag tag : tags)
            tagDTOS.add(new TagDTO(tag));
        return  new ResponseEntity<List<TagDTO>>(tagDTOS,HttpStatus.OK);
    }
	
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<TagDTO> saveTag(@RequestBody TagDTO tagDTO){
		Tag tag = new Tag();
		tag.setName(tagDTO.getName());
		
		tag = tagService.save(tag);
		return new ResponseEntity<TagDTO>(new TagDTO(tag), HttpStatus.CREATED);
	}
	
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<TagDTO> updateTag(@RequestBody TagDTO tagDTO, @PathVariable("id") Integer id){
		Tag tag = tagService.findOne(id);
		if(tag == null) {
			return new ResponseEntity<TagDTO>(HttpStatus.BAD_REQUEST);
		}
		tag.setName(tagDTO.getName());
		
		tag = tagService.save(tag);
		return new ResponseEntity<TagDTO>(new TagDTO(tag), HttpStatus.CREATED);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteTag(@PathVariable("id") Integer id){
		Tag tag = tagService.findOne(id);
		if(tag != null) {
			tagService.remove(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

}
