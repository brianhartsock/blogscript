goog.require('goog.testing.jsunit');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');
goog.require('blog.views.Post');


function test_can_render_details_view(){
  var p = new blog.models.Post();
  p.setBody("body");
  p.setHeader("header");

  var c = new blog.models.Comment("Brian", "hartsock@gmail.com", "http://google.com", "Test");

  p.addComment(c);

  var html = blog.views.Post.details({post: p});
}
