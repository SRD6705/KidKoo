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

// function showPost(){
// 	fs.readFile
// }


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

function getAllPosts(){
	return postArr;
}

module.exports = {
	getAllPosts: getAllPosts,
	makePost: makePost,
	saveAllPost: saveAllPost
};