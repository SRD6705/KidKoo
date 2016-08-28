var fs = require("fs");

var postArr;

try {
	postArr = JSON.parse(fs.readFileSync("./posts.json"));
} catch (e) {
	postArr = [];
}


function makePost(student,emotion,date,time,post,counselor){
	var newPost = {
		student: student,
		emotion: emotion,
		date: date,
		time:time,
		post: post,
		counselor: counselor
	};

	postArr.push(newPost);

	saveAllPost();
	return true;

}

function showAll(){}


function saveAllPost() {
	fs.writeFile(
		"./posts.json",
		JSON.stringify(postArr),
		function(err) {
			if (err) {
				console.log(err);
			}
		}
	);
}



module.export = {
	makePost: makePost,
	saveAllPost: saveAllPost,
	showAll: showAll
}