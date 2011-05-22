goog.require('blog.models.Post')
goog.require('blog.models.Comment')
goog.require('blog.views.Comment')
goog.require('blog.views.Post')


document.onload = function(){
  //Setup data
  var blog_post = new blog.models.Post();
  blog_post.setHeader("Test");
  blog_post.setBody("Hello World");

  var comment1 = new blog.models.Comment('brian', 'b@mailtrust.com', 'http://google.com', 'hello');
  var comment2 = new blog.models.Comment('brian2', 'b2@mailtrust.com', 'http://google2.com', 'hello2');

  blog_post.addComment(comment1);
  blog_post.addComment(comment2);

  //Write out blog post
  var post_div = goog.dom.getElement('post');
  var post_fragment = goog.dom.htmlToDocumentFragment(blog.views.Post.details({post: blog_post}));

  post_div.appendChild(post_fragment);

};
