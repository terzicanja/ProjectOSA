$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	
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
//			$('#logovan').append('<p>'+loggedin.username+'</p>');
//			console.log('uloga ulogovanog je: '+loggedin.role);
			$("#me").attr("href", "http://localhost:8080/html/profile.html?id="+loggedin.username);
			console.log(loggedin);
		}
	});
	
	
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
	        var postPhoto;
	        var userPhoto;
	        var s = "/img/noimage.png";
			var u = "/img/nouser.jpg";
			
			for(var i=0; i<data.length; i++){
//				if(data[i].active==true){
					$('.posts').append('<div class="post">'+
							'<img class="pic" id="pic" src="data:image/gif;base64,'+data[i].user.photo+'" onError="this.src=\x27'+u+'\x27;">'+
							'<a href="http://localhost:8080/html/profile.html?id='+data[i].user.username+'" class="username">'+
							data[i].user.username+'</a><br>'+
							'<p id="date">'+data[i].date+'</p>'+
							'<a href="http://localhost:8080/html/post.html?id='+data[i].id+'" id="title"><h3>'+data[i].title+'</h3></a><br>'+
							'<img id="img" src="data:image/gif;base64,'+data[i].photo+'" onError="this.src=\x27'+s+'\x27;">'+
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
		
		var postPhoto;
        var userPhoto;
		
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
				var s = "/img/noimage.png";
				var u = "/img/nouser.jpg";
				
				for(var i=0; i<datao.length; i++){
//					if(data[i].active==true){
						$('.posts').append('<div class="post">'+
								'<img class="pic" id="pic" src="data:image/gif;base64,'+datao[i].user.photo+'" onError="this.src=\x27'+u+'\x27;">'+
								'<a href="http://localhost:8080/html/profile.html?id='+datao[i].user.username+'" class="username">'+
								datao[i].user.username+'</a><br>'+
								'<p id="date">'+datao[i].date+'</p>'+
								'<a href="http://localhost:8080/html/post.html?id='+datao[i].id+'" id="title"><h3>'+datao[i].title+'</h3></a><br>'+
								'<img id="img" src="data:image/gif;base64,'+datao[i].photo+'" onError="this.src=\x27'+s+'\x27;">'+
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
	
	
	
	
	
	$('#searchbtn').on('click', function(event){
		var srchinput = $('.srchinput');
		var search = srchinput.val();
		console.log('searchujem po: ' + search);
		
		window.location.replace('http://localhost:8080/html/search.html?search='+search);
		
	});
	
	
	
	

});