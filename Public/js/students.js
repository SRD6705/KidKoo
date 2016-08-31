$('.open').hide();
$('.had_emotion').click(function(evt) {
    var clickedButton = $(evt.target);
    var emotionContainer = clickedButton.parent().parent();
    emotionContainer.find('.open').show();
    emotionContainer.find('.closed').hide();
});
$('.cancel').click(function(evt) {
    var clickedButton = $(evt.target);
    var emotionContainer = clickedButton.parent().parent();
    emotionContainer.find('.open').hide();
    emotionContainer.find('.closed').show();
});



$(".ourSend").click(function(evt){

	var date = $(this).parent().find('.date').val();
	var post = $(this).parent().find('.post').val();
	var emotion = $(this).parent().find('.emotion').val();

	$(this).parent().find('.post').val("");

	console.log(date, "tell me something");
	console.log(post);
	sendPosts(date,emotion,post);
});


function sendPosts(date,emotion,post){
	$.post('/posts', 
	{
		date: date,
		emotion:emotion, 
		post: post

	}, 
	function(response){
		if(response === "success"){
			console.log("everythig kindof went well");
		}
	});
}

