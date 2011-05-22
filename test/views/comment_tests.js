goog.require('goog.testing.jsunit');
goog.require('blog.models.Comment');
goog.require('blog.views.Comment');


function test_can_load_comment(){
  var c = new blog.models.Comment("name", "email", "webpage", "help");

  var html = blog.views.Comment.details({comment: c});

  assertContains("help", html);
}

function test_can_load_add_comment(){
  var html = blog.views.Comment.add();
}

function test_can_load_comment_list(){
  var c1 = new blog.models.Comment("name", "email", "webpage", "help");
  var c2 = new blog.models.Comment("name", "email", "webpage", "help2");

  var html = blog.views.Comment.comment_list({comments: [c1, c2]});
  assertContains("help", html);
  assertContains("help2", html);
}
