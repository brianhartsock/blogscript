goog.require('blog.models.Post')
goog.require('blog.models.Comment')
goog.require('blog.controllers.AddComment');
goog.require('blog.controllers.CommentList');

window.onload = function(){
  //Setup data
  var blog_post = new blog.models.Post();
  blog_post.setHeader("Test");
  blog_post.setBody("Hello World");

  var comment1 = new blog.models.Comment('brian', 'b@mailtrust.com', 'http://google.com', 'hello');
  var comment2 = new blog.models.Comment('brian2', 'b2@mailtrust.com', 'http://google2.com', 'hello2');

  blog_post.addComment(comment1);
  blog_post.addComment(comment2);

  //Write out blog post
  var comment_list = new blog.controllers.CommentList(blog_post);
  var add_comment = new blog.controllers.AddComment(blog_post);

  comment_list.render(goog.dom.getElement('comment_list'));
  add_comment.render(goog.dom.getElement('add_comment'));

}
