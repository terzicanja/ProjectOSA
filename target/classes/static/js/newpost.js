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
			$("#me").attr("href", "http://localhost:8080/html/profile.html?id="+loggedin.username);
			
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
			$.ajax({
				url: 'http://localhost:8080/api/tags',
				type: 'GET',
				headers: {'Authorization': 'Bearer ' + token},
				contentType: 'application/json',
//				data : JSON.stringify(post),
				crossDomain: true,
				dataType: 'json',
				success:function(d){
					console.log("znaci vamo tagove sve citam");
					console.log(d);
					
					for(var i=0; i<d.length; i++){
						$('#uploaded').after('<input type="checkbox" name="tags" value="'+d[i].id+'">'+d[i].name+'<br>');
					}
					
				}
			});
			
			
			
			
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
			
			
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#bla').attr('src', e.target.result);
			}

//			reader.readAsDataURL(input.files[0]);
			
			
			
			
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
						
						
						
						var checkboxes = document.getElementsByName('tags');
						var checkboxesChecked = [];
						for (var i=0; i<checkboxes.length; i++) {
							if (checkboxes[i].checked) {
								
								
								$.ajax({
									url: 'http://localhost:8080/api/posts/tags/'+datap.id+'/'+checkboxes[i].value,
									type: 'POST',
									headers: {'Authorization': 'Bearer ' + token},
//									data : JSON.stringify(post),
//									data : data,
									contentType: 'application/json',
//									processData: false,
									crossDomain: true,
//									dataType: 'json',
									success:function(datap){
										console.log("dodati su tagovi na post");
//										
									},
									error: function (jqXHR, textStatus, errorThrown) {  
										alert(textStatus);
									}
								});
								
								
								
								
								
								checkboxesChecked.push(checkboxes[i].value);
							}
						}
						console.log("ovo su chekovani: " + checkboxesChecked);
						console.log(checkboxesChecked);
						
						
						
						
						
						
						if(blobFile == null){
							console.log("blob je prazan");
//							window.location.replace("http://localhost:8080/");
						}else{
							var data = new FormData();
							data.append("id", datap.id);
							data.append("photo", blobFile);
							
							$.ajax({
								url: 'http://localhost:8080/api/posts/photo',
								type: 'POST',
								headers: {'Authorization': 'Bearer ' + token},
//								data : JSON.stringify(post),
								data : data,
								contentType: false,
								processData: false,
								crossDomain: true,
//								dataType: 'json',
								success:function(datap){
									console.log("dodata je slikaaaa");
//									
								},
								error: function (jqXHR, textStatus, errorThrown) {  
									alert(textStatus);
								}
							});
						}
						
						
						
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