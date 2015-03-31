var buildify = require("buildify");
var build_path = "/home/akshat/Repo/wrinq/blog/";
var fs = require("fs");
var marked = require("marked");
var mustache = require("mustache");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

buildify.task({
    name:"convert-book",
    task:function(){
	console.log("starting book conversion....");
	var book_template = fs.readFileSync(build_path+"book_template.html");
	var book = fs.readFileSync("./book.md");
	var html = marked(book.toString());
	var rendered = mustache.render(book_template.toString(),{html:html});
	fs.writeFileSync(build_path+"contract-basics-for-landlords-and-tenants.html",rendered);
	console.log("Book has been built");
    }

});


