$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log("id profila je: "+id);
	
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
			$('#logovan').append('<p>'+loggedin.username+'</p>');
//			console.log('uloga ulogovanog je: '+loggedin.role);
			
			$.ajax({
				url: 'http://localhost:8080/api/users/get/role/'+loggedin.username,
				type: 'GET',
				headers: {'Authorization': 'Bearer ' + token},
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(data){
					console.log(data);
					
					if(data.authority == 'ROLE_ADMIN'){
						$('#logovan').after('<p>moja uloga je'+data.authority+'</p>');
						
						
						$.ajax({
							url: 'http://localhost:8080/api/users/get/role/'+id,
							type: 'GET',
							headers: {'Authorization': 'Bearer ' + token},
							contentType: 'application/json',
							crossDomain: true,
							dataType: 'json',
							success:function(dat){
								console.log(dat);
								
								if(data.authority == 'ROLE_ADMIN'){
									$('#usern').after('<p>uloga korisnika je: '+dat.authority+'</p>');
								}
								
						
							}
						});
						
						
					}
					
				}
			});
			
		
		
			$('#logoutbtn').on('click', function(){
				localStorage.removeItem('token');
				location.reload();
			});
	
	
		}
	});
	

});