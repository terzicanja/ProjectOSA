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
		url: 'http://localhost:8080/api/users/whoami',
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(loggedin){
			$("#me").attr("href", "http://localhost:8080/html/profile.html?id="+loggedin.username);
			
		}
	});
	
	
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
	
	
	
	

});