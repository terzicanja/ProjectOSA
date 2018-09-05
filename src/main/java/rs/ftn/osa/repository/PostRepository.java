package rs.ftn.osa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rs.ftn.osa.entity.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	List<Post> findAllByOrderByDateDesc();
	
	List<Post> findAllByOrderByDateAsc();
	
	@Query(value = "SELECT DISTINCT p.post_id, p.post_date, p.post_description, p.post_dislikes, p.latitude, "
			+ "p.post_likes, p.longitude, p.post_photo," +
            "p.post_title, p.user_id  FROM posts p JOIN  users u ON p.user_id = u.user_id "
            + "JOIN post_tags pt ON p.post_id = pt.post_id JOIN tags t ON pt.tag_id = t.tag_id " +
            "WHERE t.tag_name LIKE %:text% OR u.user_username LIKE %:text%",nativeQuery = true)
    List<Post> findAllBySearch(@Param("text") String text);
}
