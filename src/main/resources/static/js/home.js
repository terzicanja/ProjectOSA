$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	
	if(token == null){
		console.log("token je null");
		window.location.replace("http://localhost:8080/html/login.html");
//		$('#loginbtn')
	}
	
	
	$.ajax({
		url: 'http://localhost:8080/api/posts',
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(data){
			
			console.log('postovi su: ' + data);
			var request = new XMLHttpRequest();
	        var method = 'GET';
	        var async = true;
			
			for(var i=0; i<data.length; i++){
//				if(data[i].active==true){
					$('.posts').append('<div class="post">'+
							'<div class="pic"></div>'+
							'<a href="http://localhost:8080/html/profile.html?id='+data[i].user.username+'" class="username">'+
							data[i].user.username+'</a><br>'+
							'<p id="date">'+data[i].date+'</p>'+
							'<a href="http://localhost:8080/html/post.html?id='+data[i].id+'" id="title">'+data[i].title+'</a>'+
							'<div id="img"></div>'+
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
	
	
	$('#mostPopular, #leastPopular, #newest, #oldest').on('click', function(event){
		var sort = $(this).attr('id');
		console.log('sortiraj postove po: '+ sort);
		
		$('.posts').empty();
//		console.log('tu bi trebalo da obrise sve prethodne');
		
		$.ajax({
			url: 'http://localhost:8080/api/posts/sort/'+sort,
			type: 'GET',
			headers: {'Authorization': 'Bearer ' + token},
			contentType: 'application/json',
			crossDomain: true,
			dataType: 'json',
			success:function(datao){
				console.log('postovi su: ' + datao);
				
//				console.log('ulogovani lik je: '+loggedin.username);
				
	//			$('#title').text(data.title);
	//			$('#desc').text(data.description);
				
				for(var i=0; i<datao.length; i++){
//					if(data[i].active==true){
						$('.posts').append('<div class="post">'+
								'<div class="pic"></div>'+
								'<a href="http://localhost:8080/html/profile.html?id='+datao[i].user.username+'" class="username">'+
								datao[i].user.username+'</a><br>'+
								'<p id="date">'+datao[i].date+'</p>'+
								'<a href="http://localhost:8080/html/post.html?id='+datao[i].id+'" id="title">'+datao[i].title+'</a>'+
								'<div id="img"></div>'+
							'</div>')
//					}
					
				}
			}
		});
	});
	
	
	
	
	
	
	$('#logoutbtn').on('click', function(){
		localStorage.removeItem('token');
		location.reload();
	});
	
	$('#location').on('click', function(){
		var request = new XMLHttpRequest();
        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true';
        var async = true;
        
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
            console.log(data.results[0]);
            console.log("adresa je: "+address.formatted_address);
//            document.write(address.formatted_address);
          }
        };
        request.send();
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
	
	
	$('#searchbtn').on('click', function(event){
		var srchinput = $('.srchinput');
		var search = srchinput.val();
		console.log('searchujem po: ' + search);
		
		window.location.replace('http://localhost:8080/html/search.html?search='+search);
		
	});
	
	
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