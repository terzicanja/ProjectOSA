$(document).ready(function(){
	console.log('izmena korisnika');
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log("menjam ovog: "+id);
	var token = localStorage.getItem('token');

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
		
		$.ajax({
			type : "PUT",
			contentType : "application/json",
			headers: {'Authorization': 'Bearer ' + token},
			url :"http://localhost:8080/api/users/"+id,
			data : JSON.stringify(user),
			dataType : 'json',
			success : function(data) {
				alert('uspesno ste se izmenili');
				
				window.location.replace("http://localhost:8080/");
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