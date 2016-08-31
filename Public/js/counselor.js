
  var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  var flagWords = ["hurt", "worried", "bullied", "death", "dead", "die", "kill", "depressed", "drugs", "hate", "drunk"] ; 


  function highlitor(post, flagWords){
    post = post.split(" ");
    console.log(post);
    for (var i=0; i<post.length; i++){
        for (var j=0; j<flagWords.length; j++){
            var lastSymbol = (post[i].length-1);
            if (post[i][lastSymbol] == "," || post[i][lastSymbol] == "." || post[i][lastSymbol] == "!" || post[i][lastSymbol] == "?" || post[i][lastSymbol] == ">" || post[i][lastSymbol] == ";" || post[i][lastSymbol] == ":" || post[i][lastSymbol] == "#" || post[i][lastSymbol] == "$" || post[i][lastSymbol] == "()" || post[i][lastSymbol] == "<"){

                    var userWord = post[i].substring(0, lastSymbol);
                    console.log(userWord, "userword");
                if (flagWords[j].toLowerCase()== userWord.toLowerCase()){
                    post[i] = "<u>" + post[i] + "</u>";
                }
             }else {
                if (flagWords[j].toLowerCase()== post[i].toLowerCase()){
                    post[i] = "<u>" + post[i] + "</u>";
                }
             }
        }
    } return post.join(" ");
  }



 // check if the user exists and login if they do
        function showPosts(){
            $.get("/posts",function(data){
                // $('#hello').html('');
                for(var i = 0; i < data.length; i++){


                   var postData = highlitor(data[i].post, flagWords);


                    $('#hello').append(
                        "<tr> <td>" + (i +1) + "</td>" +  "<td>" + data[i].date + "</td>" +  "<td>" + data[i].time + "</td>"+  "<td>" + data[i].student + "</td>"+  "<td>" + data[i].emotion + "</td>"+  "<td>" + postData + "</td> </tr>" 
                        );
                }
                });
   
        }
        // on click run functions after the page is loaded
        $(document).ready(function() {
            showPosts();
        });


 function addRow(row) {
        var table = $('#new_student_post');
        var template = $('#row').clone();
        template.removeAttr('id');
        template.data({
            oo_id: row.oo_id,
            start : row.oo_start_time,
            end: row.oo_end_time
        });
        template.find('.start_time').html(formatTime(row.oo_start_time));
        template.find('.end_time').html(formatTime(row.oo_end_time));
        template.find('.teacher_name').html(row.teacher_name);
        template.find('.student_name').html(row.student_name);
        template.find('.reserve').data({
            'oo_id': row.oo_id,
            'action': "Reserve"
        }).click(performAction);
        template.find('.cancel').data({
            'oo_id': row.oo_id,
            'action': "Cancel"
        }).click(performAction);
        template.find('.delete').data({
            'oo_id': row.oo_id,
            'action': "Delete"
        }).click(performAction);
        template.show();
        table.append(template);
        return template;
    }