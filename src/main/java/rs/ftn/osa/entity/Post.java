package rs.ftn.osa.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "posts")
public class Post implements Serializable {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "post_id", unique = true, nullable = false)
	private Integer id;

	@Column(name = "post_title", unique = false, nullable = false)
	private String title;

	@Column(name = "post_description", unique = false, nullable = false)
	private String description;
	
	//nzm dal string ili sta da bude
//	@Column(name = "post_photo")
//	private String photo;
	@Lob
//	@Basic(fetch=LAZY)
	@Column(name = "post_photo", unique = false, nullable = true)
	private byte[] photo;

	@Column(name = "post_date", unique = false, nullable = false)
	private Date date;

	//columndefinition za default vrednost
	@Column(name = "post_likes", unique = false, nullable = false, columnDefinition="int default 0")
	// ili mozda ovako
	//@ColumnDefinition(0) ???
	private Integer likes;
	//a msm da moze i ovako default vrednost
	@Column(name = "post_dislikes", unique = false, nullable = false)
	private Integer dislikes = 0;
	
	@Column(name = "longitude", nullable = true)
	private float longitude;
	
	@Column(name = "latitude", nullable = true)
	private float latitude;
	
	
	//jedan post moze imati vise komentara
	//nzm dal mi treba onaj neki fetch lazy, nzm sta je to
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();
	
	//jedan user moze imati vise postova
	@ManyToOne
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private User user;
	
	//i treba jos veza za tagove
	@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name="post_tags", joinColumns = @JoinColumn(name="post_id"), inverseJoinColumns = @JoinColumn(name="tag_id"))
	private Set<Tag> tags = new HashSet<>();
	
	
	
	public void addComment(Comment comment) {
		if(comment.getPost() != null) {
			comment.getPost().getComments().remove(comment);
		}
		comment.setPost(this);
		getComments().add(comment);
	}
	
	public void removeComment(Comment comment) {
		comment.setPost(null);
		getComments().remove(comment);
	}
	
	public void addTag(Tag tag) {
		tags.add(tag);
		tag.getPosts().add(this);
	}
	
	public void removeTag(Tag tag) {
		tags.remove(tag);
		tag.getPosts().remove(this);
	}
	
	
	public Post() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}

	public Integer getDislikes() {
		return dislikes;
	}

	public void setDislikes(Integer dislikes) {
		this.dislikes = dislikes;
	}
	
//	public String getPhoto() {
//		return photo;
//	}
//
//	public void setPhoto(String photo) {
//		this.photo = photo;
//	}
	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}
	

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	
	@Override
	public String toString() {
		return "Post [id=" + id + ", title=" + title + ", description=" + description + ", date=" + date + ", likes="
				+ likes + ", dislikes=" + dislikes + "]";
	}

}
