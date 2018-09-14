//function previewFile(){
//				console.log("kliknuo upload");
//				var preview = document.getElementById('uploaded'); //selects the query named img
//			    var file = document.querySelector('input[type=file]').files[0]; //sames as here
//			    var reader = new FileReader();
//
//			    reader.onloadend = function () {
//			       preview.src = reader.result;
//			    }
//
//			    if (file) {
//			       reader.readAsDataURL(file); //reads the data as a URL
////			       console.log("nzm tacno sta je ovo: " + reader.readAsDataURL(file));
//			    } else {
//			       preview.src = "";
//			    }
//			};
//			
//			previewFile();




$(document).ready(function(){
	
	
	console.log(localStorage.getItem('token'));
	
	var token = localStorage.getItem('token');
	var lat;
	var long;
	
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log("id posta je: "+id);
	
	if(token == null){
		console.log("token je null");
		window.location.replace("http://localhost:8080/html/login.html");
	}
	
	console.log("ovde pravim novi post");
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(successFunction);
	} else {
	    alert('ne mere');
	}
	function successFunction(position) {
	    lat = position.coords.latitude;
	    long = position.coords.longitude;
	    console.log('Your latitude is :'+lat+' and longitude is '+long);
	}
	console.log("pozivam ono za lokaciju" + lat + long);
	
	$.ajax({
		url: 'http://localhost:8080/api/users/whoami',
		type: 'GET',
		headers: {'Authorization': 'Bearer ' + token},
		contentType: 'application/json',
		crossDomain: true,
		dataType: 'json',
		success:function(loggedin){
			$('#logovan').append('<p>'+loggedin.username+'</p>');
			console.log('uloga ulogovanog je: '+loggedin.role);
			
//			var contentInput = $('#addContent');
//			var content = contentInput.val();
//			var titleInput = $('#addContentTitle');
//			var title = titleInput.val();
//			
//			var post = {
//					'title': title,
//					'description': content,
////					'post': id,
////					'date': '01.01.2111.',
//					'likes': 66,
//					'dislikes': 55,
//					'user': loggedin
//			}
//			
//			$.ajax({
//				url: 'http://localhost:8080/api/posts/create',
//				type: 'POST',
//				headers: {'Authorization': 'Bearer ' + token},
//				contentType: 'application/json',
//				data : JSON.stringify(post),
//				crossDomain: true,
//				dataType: 'json',
//				success:function(loggedin){
//					console.log("uspesno napravljen post");
//					
//			
//				}
//			});
			
			
			
			
//			var blobFile = $('#filechooser').files[0];
//		    var formData = new FormData();
//		    formData.append("fileToUpload", blobFile);
//
//		    $.ajax({
//		       url: "upload.php",
//		       type: "POST",
//		       data: formData,
//		       processData: false,
//		       contentType: false,
//		       success: function(response) {
//		           // .. do something
//		       }
//		    });
			
			
			
			
			$('#postPost').on('click', function(event){
				console.log('kliknut post post');
				var contentInput = $('#addPost');
				var content = contentInput.val();
				var titleInput = $('#addPostTitle');
				var title = titleInput.val();
				
				var blobFile = $('#upload')[0].files[0];
//			    var formData = new FormData();
//			    formData.append("fileToUpload", blobFile);
				
				var post = {
						'title': title,
						'description': content,
//						'post': id,
//						'date': '01.01.2111.',
						'likes': 66,
						'dislikes': 55,
						'user': loggedin,
						'longitude': long,
//						'photo': formData,
						'latitude': lat
						
				}
				
				$.ajax({
					url: 'http://localhost:8080/api/posts/create',
					type: 'POST',
					headers: {'Authorization': 'Bearer ' + token},
					data : JSON.stringify(post),
					contentType: 'application/json',
					crossDomain: true,
					dataType: 'json',
					success:function(datap){
						console.log("dodat je novi poooost");
//						$('#addContent').val('');
//						$('#addContentTitle').val('');
//						location.reload();
						
						var data = new FormData();
						data.append("id", datap.id);
						data.append("photo", blobFile);
						
						$.ajax({
							url: 'http://localhost:8080/api/posts/photo',
							type: 'POST',
							headers: {'Authorization': 'Bearer ' + token},
//							data : JSON.stringify(post),
							data : data,
							contentType: false,
							processData: false,
							crossDomain: true,
//							dataType: 'json',
							success:function(datap){
								console.log("dodata je slikaaaa");
//								
							},
							error: function (jqXHR, textStatus, errorThrown) {  
								alert(textStatus);
							}
						});
						
					}
				});
				
				event.preventDefault();
				return false;
			});
			
			
			
//			function previewFile(){
//			$('#upload').on('click', function(){
//			function previewFile(){
//				console.log("kliknuo upload");
//				var preview = document.getElementById('uploaded'); //selects the query named img
//			    var file = document.querySelector('input[type=file]').files[0]; //sames as here
//			    var reader = new FileReader();
//
//			    reader.onloadend = function () {
//			       preview.src = reader.result;
//			    }
//
//			    if (file) {
//			       reader.readAsDataURL(file); //reads the data as a URL
//			       console.log("nzm tacno sta je ovo: " + reader.readAsDataURL(file));
//			    } else {
//			       preview.src = "";
//			    }
//			};
//			
//			previewFile(); 
			
			
			
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
	
		}
	});

});