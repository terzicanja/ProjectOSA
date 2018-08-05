package rs.ftn.osa.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "comments")
public class Comment implements Serializable {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "comment_id", unique = true, nullable = false)
	private Integer id;

	@Column(name = "comment_title", unique = false, nullable = false)
	private String title;

	@Column(name = "comment_description", unique = false, nullable = false)
	private String description;

	@Column(name = "comment_date", unique = false, nullable = false)
	private Date date;

	@Column(name = "comment_likes", unique = false, nullable = false)
	private Integer likes;

	@Column(name = "comment_dislikes", unique = false, nullable = false)
	private Integer dislikes;
	
	
	//many comments to one user
	@ManyToOne
	@JoinColumn(name="user_id", referencedColumnName="user_id", nullable=false)
	private User user;
	
	//vise komentara na jedan post
	@ManyToOne
	@JoinColumn(name="post_id", referencedColumnName="post_id", nullable=false)
	private Post post;
	
	

	public Comment() {

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
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", title=" + title + ", description=" + description + ", date=" + date + ", likes="
				+ likes + ", dislikes=" + dislikes + ", user=" + user + ", post=" + post + "]";
	}

}
