$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	
	var search = window.location.search.slice(1).split('&')[0].split('=')[1];
	
	if(token == null){
		console.log("token je null");
		window.location.replace("http://localhost:8080/html/login.html");
//		$('#loginbtn')
	}
	
	
	$.ajax({
		url: 'http://localhost:8080/api/posts/search/'+search,
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(data){
			console.log('postovi su: ' + data);
			for(var i=0; i<data.length; i++){
//				if(data[i].active==true){
					$('.posts').append('<div class="post">'+
							'<div class="pic"></div>'+
							'<a href="#" class="username">username</a><br>'+
							'<a href="http://localhost:8080/html/post.html?id='+data[i].id+'" id="title">'+data[i].title+'</a>'+
							'<div id="img"></div>'+
						'</div>')
//				}
				
			}
		}
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