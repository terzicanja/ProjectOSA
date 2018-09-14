$(document).ready(function(){
	console.log('registracijaa');

	$('#registerbtn').on('click', function(event){
		
		console.log('kliknuto dugme');
		var nameInput = $("input[name='ime']");
		var userNameInput = $("input[name='username']");
		var passwordInput = $("input[name='password']");
		var name = userNameInput.val();
		var username = userNameInput.val();
		var password = passwordInput.val();
		console.log("username i pass su: "+username+password)
		
		
		var blobFile = $('#upload')[0].files[0];
		
		var user = {
				'name': name
				'username': username,
				'password': password
		}
		
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url :"http://localhost:8080/api/users/create",
			data : JSON.stringify(user),
			dataType : 'json',
			success : function(datap) {
				alert('uspesno ste se registrovali');
				
				
				var data = new FormData();
				data.append("id", datap.id);
				data.append("photo", blobFile);
				
				$.ajax({
					url: 'http://localhost:8080/api/users/photo',
					type: 'POST',
//					headers: {'Authorization': 'Bearer ' + token},
					data : data,
					contentType: false,
					processData: false,
					crossDomain: true,
//					dataType: 'json',
					success:function(datap){
						console.log("dodata je slikaaaa");
//						
					},
					error: function (jqXHR, textStatus, errorThrown) {  
						alert(textStatus);
						console.log("greska u dodavanju slike" + errorThrown + jqXHR);
						console.log(jqXHR);
					}
				});
				
				
				
				
//				window.location.replace("http://localhost:8080/");
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		
//		$.post("https://localhost:8443/auth/login", {}, function(data){
//			console.log(data);
			
			
		});
		
		event.preventDefault();
		return false;
	});
	
	
	
});