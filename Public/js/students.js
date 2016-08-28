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

