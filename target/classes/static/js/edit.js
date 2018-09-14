$(document).ready(function(){
	console.log('izmena korisnika');
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log("menjam ovog: "+id);
	var token = localStorage.getItem('token');
	
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
		url: 'http://localhost:8080/api/users/find/'+id,
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(dat){
			
			$('#ime').val(dat.name);
			$('#korisnicko').val(dat.username);
			$('#korisnicko').prop('disabled', true);
			
		}
	});
	
	
	

	$('#editbtn').on('click', function(event){
		
		console.log('kliknuto dugme');
		var NameInput = $("input[name='nameEdit']");
		var userNameInput = $("input[name='usernameEdit']");
		var passwordInput = $("input[name='passwordEdit']");
		var name = NameInput.val();
		var username = userNameInput.val();
		var password = passwordInput.val();
		console.log("username i pass su: "+username+password)
		
		var user = {
			'name': name,
//			'username': username,
			'password': password
		}
		
//		var blobFile = $('#upload')[0].files[0];
		
		$.ajax({
			type : "PUT",
			contentType : "application/json",
			headers: {'Authorization': 'Bearer ' + token},
			url :"http://localhost:8080/api/users/"+id,
			data : JSON.stringify(user),
			dataType : 'json',
			success : function(data) {
				alert('uspesno ste se izmenili');
				console.log(data);
				var blobFile = $('#upload')[0].files[0];
				if(blobFile == null){
					console.log("blob je prazan");
//					window.location.replace("http://localhost:8080/");
				}else{
					console.log("blob nije prazan");
					console.log(typeof data.id);
					var dataa = new FormData();
					dataa.append("id", data.id);
					dataa.append("photo", blobFile);
					
					$.ajax({
						url: 'http://localhost:8080/api/users/photo',
						type: 'POST',
//						headers: {'Authorization': 'Bearer ' + token},
						data : dataa,
						contentType: false,
						processData: false,
						crossDomain: true,
						success:function(datap){
							console.log("updejtovana je slikaaaa");
//							
						},
						error: function (jqXHR, textStatus, errorThrown) {  
							alert(textStatus);
							console.log("greska u dodavanju slike" + errorThrown + jqXHR);
							console.log(jqXHR);
						}
					});
					
				}
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
			
			
		});
		
		event.preventDefault();
		return false;
	});
	
	
	
});