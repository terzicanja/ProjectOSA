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
			$("#me").attr("href", "http://localhost:8080/html/profile.html?id="+loggedin.username);
			
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
									$('#usern').after('<p id="uloga">uloga korisnika je: '+dat.authority+'</p>');
									$('#uloga').after('<p id="bla">promeni korisnika u: </p>');
									$('#bla').after('<select id="ponudaUloga">'+
											  '<option value="ROLE_COMMENTATOR">Komentator</option>'+
											  '<option value="ROLE_USER">Objavljivac</option>'+
											  '<option value="ROLE_ADMIN">Admin</option>'+
											  '</select>'+
											'<button id="update" type="button">Potvrdi</button>');
									
									$('#update').on('click', function(event){
										console.log("hocu da unapredim ovog");
										var e = document.getElementById("ponudaUloga");
										var role = e.options[e.selectedIndex].value;
										console.log("hocu da ga promenim u: "+role);
										
										$.ajax({
											url: 'http://localhost:8080/api/users/role/'+id+'/'+role,
											type: 'POST',
											headers: {'Authorization': 'Bearer ' + token},
											contentType: 'application/json',
											crossDomain: true,
											dataType: 'json',
											success:function(dataRole){
												console.log(dataRole);
												console.log("valjda sam ga apdejtovala u: "+role);
												
											},
											error: function (jqXHR, textStatus, errorThrown) {  
												alert(textStatus);
												console.log(jqXHR);
											}
										});
										
										event.preventDefault();
										return false;
									});
									
								}
							}
						});
					}
				}
			});
			
			
			
			$.ajax({
				url: 'http://localhost:8080/api/users/find/'+id,
				type: 'GET',
				headers: {'Authorization': 'Bearer ' + token},
				contentType: 'application/json',
				crossDomain: true,
				dataType: 'json',
				success:function(dat){
					console.log(dat);
					$('#postBy').text(dat.username);
					$('#usern').text(dat.name);
					
					var userPhoto;
					if(dat.photo !=null){
						userPhoto = 'data:image/gif;base64,'+dat.photo;
					}
					$("#pic").attr("src", userPhoto);
					
					if(dat.username == loggedin.username){
						console.log('gledam svoj profiiiil');
						$('#usern').after('<a href="http://localhost:8080/html/edit.html?id='+dat.username+'" class="usernameComm">edit profile</a>');
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