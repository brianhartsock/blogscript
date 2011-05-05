goog.require('goog.testing.jsunit');
goog.require('blog.models.Post');
goog.require('blog.views.Post');


function test_can_load_comment(){
  var p = new blog.models.Post();
  p.setBody("body");
  p.setHeader("header");

  var html = blog.views.Post.details({post: p});
}
