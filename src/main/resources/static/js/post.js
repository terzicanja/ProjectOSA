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
	
	
	$.ajax({
		url: 'http://localhost:8080/api/posts/'+id,
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(data){
			console.log('postovi su: ' + data);
			
			$('#title').text(data.title);
			$('#desc').text(data.description);
			
			
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
			
//			$('#title').text(data.title);
//			$('#desc').text(data.description);
			
			for(var i=0; i<data.length; i++){
//				if(data[i].active==true){
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
//				}
				
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
			url: 'http://localhost:8080/api/comments/'+idComm,
			type: 'PUT',
			headers: {'Authorization': 'Bearer ' + token},
			data : JSON.stringify(comm),
			contentType: 'application/json',
			crossDomain: true,
			dataType: 'json',
			success:function(data){
				console.log('lajkovan je komentar ' + data);
				
				
			}
		});
		
	});
	
	
	$('#logoutbtn').on('click', function(){
		localStorage.removeItem('token');
		location.reload();
	});
	
	
//	$.get('HomeServlet', {'sort': 'none'}, function(data){
//		console.log(data);
////		console.log('ulogovani jeee '+loggedInUser);
//		for(v in data.videos){
//			if(data.loggedInUser == null || (data.loggedInUser.role != 'ADMIN')){
//				if(data.videos[v].visibility == 'PUBLIC' && data.videos[v].deleted == false && data.videos[v].owner.blocked == false && data.videos[v].owner.deleted == false){
//					$('.recommended').append('<div id="videoHome">'+
//							'<div class="thumbnailWrapper">'+
//								'<a href="video.html?id='+ data.videos[v].id +'"><img src="'+data.videos[v].videoImg+'" id="thumbnail"></a>'+
//							'</div>'+
//							'<a href="video.html?id='+ data.videos[v].id +'" id="naslov">' + data.videos[v].name + '</a>'+
//							'<a href="profile.html?id='+ data.videos[v].owner.username +'" id="user">'+ data.videos[v].owner.username +'</a>'+
//							'<span id="views">'+ data.videos[v].views +' views</span>'+
//							'<span id="date">'+ data.videos[v].date +'</span>'+
//						'</div>')
//				}
//			}else if(data.loggedInUser.role == 'ADMIN'){
//				$('.recommended').append('<div id="videoHome">'+
//						'<div class="thumbnailWrapper">'+
//							'<a href="video.html?id='+ data.videos[v].id +'"><img src="'+data.videos[v].videoImg+'" id="thumbnail"></a>'+
//						'</div>'+
//						'<a href="video.html?id='+ data.videos[v].id +'" id="naslov">' + data.videos[v].name + '</a>'+
//						'<a href="profile.html?id='+ data.videos[v].owner.username +'" id="user">'+ data.videos[v].owner.username +'</a>'+
//						'<span id="views">'+ data.videos[v].views +' views</span>'+
//						'<span id="date">'+ data.videos[v].date +'</span>'+
//					'</div>')
//			}
//			
//		}
//		
//		for(u in data.topFive){
//			$('#top').append('<div id="osoba"><div id="korisnickoIme">'+
//					'<a href="profile.html?id=' + data.topFive[u].username + '">' + data.topFive[u].username + '</a></div>'+
//					'<div id="foloveri">'+ data.topFive[u].subsNumber +' followers</div>'+
////					'<button id="zafoluj">Follow</button>'+
//					'</div>');
//		}
//	});
	
//	$('#mostPopular, #leastPopular, #newest, #oldest, #alphabeticAuthorReverse, #alphabeticAuthor, #alphabeticReverse, #alphabetic').on('click', function(event){
//		var sort = $(this).attr('id');
//		console.log('sortiraj po: '+ sort);
//		
//		$('.recommended').empty();
//		
//		$.get('HomeServlet', {'sort': sort}, function(data){
//			console.log(data);
//			for(v in data.videos){
//				if(data.loggedInUser == null || (data.loggedInUser.role != 'ADMIN')){
//					if(data.videos[v].visibility == 'PUBLIC' && data.videos[v].deleted == false && data.videos[v].owner.blocked == false && data.videos[v].owner.deleted == false){
//						$('.recommended').append('<div id="videoHome">'+
//								'<div class="thumbnailWrapper">'+
//									'<a href="video.html?id='+ data.videos[v].id +'"><img src="'+data.videos[v].videoImg+'" id="thumbnail"></a>'+
//								'</div>'+
//								'<a href="video.html?id='+ data.videos[v].id +'" id="naslov">' + data.videos[v].name + '</a>'+
//								'<a href="profile.html?id='+ data.videos[v].owner.username +'" id="user">'+ data.videos[v].owner.username +'</a>'+
//								'<span id="views">'+ data.videos[v].views +' views</span>'+
//								'<span id="date">'+ data.videos[v].date +'</span>'+
//							'</div>')
//					}
//				}else if(data.loggedInUser.role == 'ADMIN'){
//					$('.recommended').append('<div id="videoHome">'+
//							'<div class="thumbnailWrapper">'+
//								'<a href="video.html?id='+ data.videos[v].id +'"><img src="'+data.videos[v].videoImg+'" id="thumbnail"></a>'+
//							'</div>'+
//							'<a href="video.html?id='+ data.videos[v].id +'" id="naslov">' + data.videos[v].name + '</a>'+
//							'<a href="profile.html?id='+ data.videos[v].owner.username +'" id="user">'+ data.videos[v].owner.username +'</a>'+
//							'<span id="views">'+ data.videos[v].views +' views</span>'+
//							'<span id="date">'+ data.videos[v].date +'</span>'+
//						'</div>')
//				}
//			}
//			
//		});
//		
//	});
	
	
//	$('#searchbtn').on('click', function(event){
//		var srchinput = $('.srchinput');
//		var search = srchinput.val();
//		var title = false;
//		var user = false;
//		var comment = false;
//		if($("#cbComment").is(':checked')){
//			comment = "true";
//		}
//		if($("#cbTitle").is(':checked')){
//			title = "true";
//		}
//		if($("#cbUser").is(':checked')){
//			user = "true";
//		}
//		console.log('searchujem po: ' + title + user + comment);
//		
//		window.location.replace('search.html?search='+search+'&title='+title+'&user='+user+'&comment='+comment);
//		
//	});
	
	

});