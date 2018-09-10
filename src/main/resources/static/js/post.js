$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log("id posta je: "+id);
	
	if(token == null){
		console.log("token je null");
		window.location.replace("http://localhost:8080/html/login.html");
//		$('#loginbtn')
	}
	
	
	
	function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
	}
	
	window.onclick = function(event) {
		if (!event.target.matches('.dropbtn')) {

			var dropdowns = document
					.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}
	
	
	
	
	$.ajax({
		url: 'http://localhost:8080/api/users/whoami',
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(loggedin){
			$('#logovan').append('<p>'+loggedin.username+'</p>');
			console.log('uloga ulogovanog je: '+loggedin.role);
			
//		}
//	});
	
	
		$.ajax({
			url: 'http://localhost:8080/api/posts/'+id,
			type: 'GET',
			headers: {'Authorization': 'Bearer ' + token},
			contentType: 'application/json',
			crossDomain: true,
			dataType: 'json',
			success:function(data){
				console.log('postovi su: ' + data);
				
				var request = new XMLHttpRequest();
		        var method = 'GET';
		        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+data.latitude+','+data.longitude+'&sensor=true';
		        var async = true;
		        var address;
		        
		        request.open(method, url, async);
		        request.onreadystatechange = function(){
		          if(request.readyState == 4 && request.status == 200){
		            var dat = JSON.parse(request.responseText);
		            address = dat.results[0];
		            console.log(dat.results[0]);
		            console.log("adresa je: "+address.address_components[2].long_name);
		            $('#location').text(address.address_components[2].long_name+', '+address.address_components[5].long_name);
//		            document.write(address.formatted_address);
		          }
		        };
		        request.send();
				
				
				
				
				$('#title').text(data.title);
				$('#datumPosta').text(data.date);
				$('#desc').text(data.description);
				$('#postBy').text(data.user.username);
				$('#postBy').attr("href", "http://localhost:8080/html/profile.html?id="+data.user.username);
				$('#postUpvoteBr').text(data.likes);
				$('#postDownvoteBr').text(data.dislikes);
				
				if(loggedin.username == data.user.username){
					$('#title').after('<button id="editPost" name="'+data.id+'">edit post</button>');
					$('#title').after('<button id="deletePost" name="'+data.id+'">delete post</button>');
				}
				
				
				$.ajax({
					url: 'http://localhost:8080/api/tags/tagbypost/'+id,
					type: 'GET',
					headers: {'Authorization': 'Bearer ' + token},
					contentType: 'application/json',
					crossDomain: true,
					dataType: 'json',
					success:function(dataa){
						console.log('tagovi su: ' + dataa);
						
						
						for(var i=0; i<dataa.length; i++){
	//						if(data[i].active==true){
								$('#tags').append('<a href="#" class="tag"><span id="'+dataa[i].id+'">#'+dataa[i].name+'</span></a> <span> </span>'+
	//									'<div class="pic"></div>'+
	//									'<a href="#" class="username">username</a><br>'+
	//									'<a href="http://localhost:8080/html/post.html?id='+data[i].id+'" id="title">'+data[i].title+'</a>'+
	//									'<div id="img"></div>'+
	//									'<div id="tags">Tagovi: </div>'+
									'')
	//						}
							
						}
					}
				});
				
				
				
	//			for(var i=0; i<data.length; i++){
	////				if(data[i].active==true){
	//					$('#tags').append('<a href="#" class="tag">'+data[i].id+'</a>'+
	//							'<div class="pic"></div>'+
	//							'<a href="#" class="username">username</a><br>'+
	//							'<a href="http://localhost:8080/html/post.html?id='+data[i].id+'" id="title">'+data[i].title+'</a>'+
	//							'<div id="img"></div>'+
	//							'<div id="tags">Tagovi: </div>'+
	//						'</div>')
	////				}
	//				
	////			}
			}
		});
		
		$.ajax({
			url: 'http://localhost:8080/api/comments/post/'+id,
			type: 'GET',
			headers: {'Authorization': 'Bearer ' + token},
			contentType: 'application/json',
			crossDomain: true,
			dataType: 'json',
			success:function(data){
				console.log('postovi su: ' + data);
				
				console.log('ulogovani lik je: '+loggedin.username);
				
	//			$('#title').text(data.title);
	//			$('#desc').text(data.description);
				
				for(var i=0; i<data.length; i++){
					if(data[i].user.username == loggedin.username){
						$('.comments').append('<div class="comment">'+
								'<div class="picComm"></div>'+
								'<a href="#" class="usernameComm">'+data[i].user.username+'</a><br>'+
								'<div id="titleComm">'+data[i].title+'</div>'+
								'<div id="dateComm">'+data[i].date+'</div>'+
								'<div id="descComm'+data[i].id+'">'+data[i].description+'</div>'+
								'<div id="upvoteBr" name="u'+data[i].id+'">'+data[i].likes+'</div>'+
								'<button id="upvote" name="'+data[i].id+'">up</button>'+
								'<button id="downvote" name="'+data[i].id+'">down</button>'+
								'<div id="downvoteBr" name="d'+data[i].id+'">'+data[i].dislikes+'</div><br>'+
								'<button id="edit" name="'+data[i].id+'">edit</button>'+
								'<button id="delete" name="'+data[i].id+'">delete</button>'+
							'</div>')
					}else if(data[i].username!=loggedin.username){
						$('.comments').append('<div class="comment">'+
								'<div class="picComm"></div>'+
								'<a href="#" class="usernameComm">'+data[i].user.username+'</a><br>'+
								'<div id="titleComm">'+data[i].title+'</div>'+
								'<div id="dateComm">'+data[i].date+'</div>'+
								'<div id="descComm">'+data[i].description+'</div>'+
								'<div id="upvoteBr" name="u'+data[i].id+'">'+data[i].likes+'</div>'+
								'<button id="upvote" name="'+data[i].id+'">up</button>'+
								'<button id="downvote" name="'+data[i].id+'">down</button>'+
								'<div id="downvoteBr" name="d'+data[i].id+'">'+data[i].dislikes+'</div><br>'+
							'</div>')
					}
					
				}
			}
		});
		
		
		
		
	//	$('.posts').append('<table>'+
	////			'<tr><th>username</th><th>role</th></tr>'+
	//			'<tr><td>'+data[i].title+'</td><td>'+data[i].description+'</td>'+
	////			'<td><input type="button" value="dwnld jks" id="jksbtn" name="'+data[i].id+'"></td>'+
	////			'<td><input type="button" value="dwnld sert" id="certbtn" name="'+data[i].id+'"></td>'+
	////			'<td><button>send email</button></td></tr>'+
	//			''+
	////			"<p>"+data[i].email+"</p>" +
	//					'</table>')
	////}
		
		
		$(document).on('click', '#upvote', function(){
			console.log('upvote komentara kliknut');
			var idComm = this.name;
			console.log('id upvote komentara je: ' + idComm);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/comments/upvote/'+idComm,
				type: 'PUT',
				headers: {'Authorization': 'Bearer ' + token},
				data : JSON.stringify(comm),
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
					console.log('lajkovan je komentar ' + data);
//					$(".comments").load(window.location.href + " .comments" );
//					var elements = document.querySelectorAll('input[id^="id_qtedje_"]');
//					var upvoteBr = document.getElementsByName('u'+idComm);
////					var upvoteBr = document.getElementById('upvoteBr');
//				    var number = upvoteBr.innerHTML;
//				    console.log('ovo je jebeni number: '+number);
//				    number++;
//				    upvoteBr.innerHTML = number;
				}
			});
		});
		
		$(document).on('click', '#downvote', function(){
			console.log('downvote komentara kliknut');
			var idComm = this.name;
			console.log('id downvote komentara je: ' + idComm);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/comments/downvote/'+idComm,
				type: 'PUT',
				headers: {'Authorization': 'Bearer ' + token},
				data : JSON.stringify(comm),
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
					console.log('dislajkovan je komentar ' + data);
//					var downvoteBr = document.getElementById('downvoteBr');
//				    var number = downvoteBr.innerHTML;
//				    number++;
//				    downvoteBr.innerHTML = number;
				}
			});
		});
		
		$(document).on('click', '#upvotePost', function(){
			console.log('upvote posta kliknut');
			var idComm = this.name;
			console.log('id upvote posta je: ' + id);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/posts/upvote/'+id,
				type: 'PUT',
				headers: {'Authorization': 'Bearer ' + token},
				data : JSON.stringify(comm),
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
//					console.log('lajkovan je post ' + data);
					var postUpvoteBr = document.getElementById('postUpvoteBr');
				    var number = postUpvoteBr.innerHTML;
				    number++;
				    postUpvoteBr.innerHTML = number;
				}
			});
		});
		
		$(document).on('click', '#downvotePost', function(){
			console.log('downvote posta kliknut');
			var idComm = this.name;
			console.log('id downvote posta je: ' + id);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/posts/downvote/'+id,
				type: 'PUT',
				headers: {'Authorization': 'Bearer ' + token},
				data : JSON.stringify(comm),
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
//					console.log('dislajkovan je post ' + data);
					var postDownvoteBr = document.getElementById('postDownvoteBr');
				    var number = postDownvoteBr.innerHTML;
				    number++;
				    postDownvoteBr.innerHTML = number;
				}
			});
		});
		
		
		
		$(document).on('click', '#edit', function(){
			console.log('edit komentara kliknut');
			var idComm = this.name;
			console.log('id upvote komentara je: ' + idComm);
			var find = '#descComm' + idComm;
			var old = $(find).text();
			console.log('stari komentar je: '+old);
			$(find).hide();
			$('#dateComm').after('<textarea id="editContent'+idComm+'" maxlength="100">'+old+'</textarea>');
			var editContent = '#editContent' + idComm;
			$(editContent).after('<button type="button" class="cancelEdit" id="cancelEdit'+idComm+'" name="'+idComm+'">cancel</button>');
			$(editContent).after('<button type="button" class="confirmEdit" id="confirmEdit'+idComm+'" name="'+idComm+'">confirm</button>');
			
			
			$('.confirmEdit').on('click', function(event){
				console.log('potvrdjujem edit');
				var newId = $(this).attr('name');
				var newContent = '#editContent' + newId;
				var newComment = $(newContent).val();
				
				
				var comm = {
//						'email': username,
						'description': newComment
				}
				
				
				$.ajax({
					url: 'http://localhost:8080/api/comments/'+idComm,
					type: 'PUT',
					headers: {'Authorization': 'Bearer ' + token},
					data : JSON.stringify(comm),
					contentType: 'application/json',
					crossDomain: true,
					dataType: 'json',
					success:function(data){
						console.log('editovan je komentar ' + data);
						$(newContent).fadeOut();
						$(find).fadeIn();
						$(find).text(newComment);
						var brisi = '#cancelEdit'+newId;
						var brisi2 = '#confirmEdit'+newId;
						$(brisi).fadeOut();
						$(brisi2).fadeOut();
					}
				});
				
				
				
				
//				$.post('CommentServlet',{'id': id, 'newId':newId,'status':"edit",'newComment':newComment},function(data){
////					var oldContent=$(select).text(content);
////					var oldDate=$(dateSelect).text(data.newDate);
//					$(newContent).fadeOut();
//					$(find).fadeIn();
//					$(find).text(newComment);
//					var brisi = '#cancelEdit'+newId;
//					var brisi2 = '#confirmEdit'+newId;
//					$(brisi).fadeOut();
//					$(brisi2).fadeOut();
//				});
				
				event.preventDefault();
				return false;
			});
			
			
			$('.cancelEdit').on('click', function(event){
				console.log('cancel edit');
				var contentId = $(this).attr('name');
				var editContent = '#editContent' + contentId;
				var cancelEdit = '#cancelEdit' + contentId;
				var confirmEdit = '#confirmEdit' + contentId;
				var findOld = '#descComm' + contentId;
				
				$(editContent).remove();
				$(cancelEdit).remove();
				$(confirmEdit).remove();
				
				$(findOld).show();
				
				event.preventDefault();
				return false;
			});
		});
		
		
		$(document).on('click', '#delete', function(){
			console.log('delete komentara je kliknut');
			var idComm = this.name;
			console.log('id delete komentara je: ' + idComm);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/comments/'+idComm,
				type: 'DELETE',
				headers: {'Authorization': 'Bearer ' + token},
//				data : JSON.stringify(),
				contentType: 'application/xml',
				crossDomain: true,
//				dataType: 'json',
				success:function(data){
					console.log('obrisan je komentar ' + data);
				}
			});
		});
		
		
		
		$(document).on('click', '#deletePost', function(){
			console.log('delete posta je kliknut');
//			var idComm = this.name;
			console.log('id delete post je: ' + id);
			
			var comm = {
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/posts/'+id,
				type: 'DELETE',
				headers: {'Authorization': 'Bearer ' + token},
//				data : JSON.stringify(),
				contentType: 'application/xml',
				crossDomain: true,
//				dataType: 'json',
				success:function(data){
					console.log('obrisan je post OVDE TREBA REDIRECT NA GLAVNU STRANUUUUU' + data);
				}
			});
		});
		
		
		$(document).on('click', '#editPost', function(){
//			var idComm = this.name;
			console.log('id edit post je: ' + id);
			
			console.log('edit komentara kliknut');
//			var idComm = this.name;
//			console.log('id upvote komentara je: ' + idComm);
			var find = '#title';
			var old = $(find).text();
			var desc = '#desc';
			var oldd = $(desc).text();
			console.log('stari desc je: '+oldd);
			$(find).hide();
			$(desc).hide();
			$('#title').after('<textarea id="editTitle" maxlength="100">'+old+'</textarea>');
			$('#desc').after('<textarea id="editDesc" maxlength="100">'+oldd+'</textarea>');
			var editContent = '#editDesc';
			$(editContent).after('<button type="button" class="cancelEditPost" id="cancelEditPost">cancel</button>');
			$(editContent).after('<button type="button" class="confirmEditPost" id="confirmEditPost">confirm</button>');
			
			$('.confirmEditPost').on('click', function(event){
				console.log('potvrdjujem edit posta');
//				var newId = $(this).attr('name');
				var newTitle = '#editTitle';
				var newT = $(newTitle).val();
				var newDesc = '#editDesc';
				var newD = $(newDesc).val();
				
				
				var comm = {
						'title': newT,
						'description': newD
				}
				
				
				$.ajax({
					url: 'http://localhost:8080/api/posts/'+id,
					type: 'PUT',
					headers: {'Authorization': 'Bearer ' + token},
					data : JSON.stringify(comm),
					contentType: 'application/json',
					crossDomain: true,
					dataType: 'json',
					success:function(data){
						console.log('editovan je post ' + data);
//						console.log('editovan je komentar ' + data);
						$(newTitle).fadeOut();
						$(newDesc).fadeOut();
						$(find).fadeIn();
						$(desc).fadeIn();
						$(find).text(newT);
						$(desc).text(newD);
						var brisi = '#cancelEditPost';
						var brisi2 = '#confirmEditPost';
						$(brisi).fadeOut();
						$(brisi2).fadeOut();
					}
				});
				
				
				
				event.preventDefault();
				return false;
			});
			
			
			$('.cancelEditPost').on('click', function(event){
				console.log('cancel edit');
//				var contentId = $(this).attr('name');
				var editT = '#editTitle';
				var editD = '#editDesc';
				var cancelEdit = '#cancelEditPost';
				var confirmEdit = '#confirmEditPost';
				var findOld = '#title';
				var findOldD = '#desc';
				
				$(editT).remove();
				$(editD).remove();
				$(cancelEdit).remove();
				$(confirmEdit).remove();
				
				$(findOld).show();
				$(findOldD).show();
				
				event.preventDefault();
				return false;
			});
			
			
			
			
		});
		
		
		
		
		
		
		
		
		
		
		$('#mostPopular, #leastPopular, #newest, #oldest').on('click', function(event){
			var sort = $(this).attr('id');
			console.log('sortiraj po: '+ sort);
			
			$('.comments').empty();
			console.log('tu bi trebalo da obrise sve prethodne');
			
			$.ajax({
				url: 'http://localhost:8080/api/comments/post/order/'+id+'/'+sort,
				type: 'GET',
				headers: {'Authorization': 'Bearer ' + token},
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
					console.log('postovi su: ' + data);
					
					console.log('ulogovani lik je: '+loggedin.username);
					
		//			$('#title').text(data.title);
		//			$('#desc').text(data.description);
					
					for(var i=0; i<data.length; i++){
						if(data[i].user.username == loggedin.username){
							$('.comments').append('<div class="comment">'+
									'<div class="picComm"></div>'+
									'<a href="#" class="usernameComm">'+data[i].user.username+'</a><br>'+
									'<div id="titleComm">'+data[i].title+'</div>'+
									'<div id="descComm'+data[i].id+'">'+data[i].description+'</div>'+
									'<div id="upvoteBr">'+data[i].likes+'</div>'+
									'<button id="upvote" name="'+data[i].id+'">up</button>'+
									'<button id="downvote" name="'+data[i].id+'">down</button>'+
									'<div id="downvoteBr">'+data[i].dislikes+'</div><br>'+
									'<button id="edit" name="'+data[i].id+'">edit</button>'+
									'<button id="delete" name="'+data[i].id+'">delete</button>'+
								'</div>')
						}else if(data[i].username!=loggedin.username){
							$('.comments').append('<div class="comment">'+
									'<div class="picComm"></div>'+
									'<a href="#" class="usernameComm">'+data[i].user.username+'</a><br>'+
									'<div id="titleComm">'+data[i].title+'</div>'+
									'<div id="descComm">'+data[i].description+'</div>'+
									'<div id="upvoteBr">'+data[i].likes+'</div>'+
									'<button id="upvote" name="'+data[i].id+'">up</button>'+
									'<button id="downvote" name="'+data[i].id+'">down</button>'+
									'<div id="downvoteBr">'+data[i].dislikes+'</div><br>'+
								'</div>')
						}
						
					}
				}
			});
		});
		
		
		$('#postComment').on('click', function(event){
			console.log('kliknut post comment');
			var contentInput = $('#addContent');
			var content = contentInput.val();
			var titleInput = $('#addContentTitle');
			var title = titleInput.val();
			
			var comment = {
					'title': title,
					'description': content,
//					'post': id,
//					'date': '01.01.2111.',
					'likes': 66,
					'dislikes': 55,
					'user': loggedin
			}
			
			$.ajax({
				url: 'http://localhost:8080/api/comments',
				type: 'POST',
				headers: {'Authorization': 'Bearer ' + token},
				data : JSON.stringify(comment),
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
					console.log("dodat je novi komentaar");
					$('#addContent').val('');
					$('#addContentTitle').val('');
					location.reload();
				}
			});
			
			event.preventDefault();
			return false;
		});
		
		
		
		
		
		
		$('#searchbtn').on('click', function(event){
			var srchinput = $('.srchinput');
			var search = srchinput.val();
			console.log('searchujem po: ' + search);
			
			window.location.replace('http://localhost:8080/html/search.html?search='+search);
			
		});
		
		
		
		
		
		
		
		$('#logoutbtn').on('click', function(){
			localStorage.removeItem('token');
			location.reload();
		});
	
	
		}
	});
	

});