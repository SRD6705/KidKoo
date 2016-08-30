 // check if the user exists and login if they do
        function showPosts(){
            $.get("/posts",function(data){
                // $('#hello').html('');
                for(var i = 0; i < data.length; i++){
                    $('#hello').append(
                        "<tr> <th>" + (i +1) + "</th>" +  "<th>" + data[i].date + "</th>" +  "<th>" + data[i].time + "</th>"+  "<th>" + data[i].student + "</th>"+  "<th>" + data[i].emotion + "</th>"+  "<th>" + data[i].post + "</th> </tr>" 
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