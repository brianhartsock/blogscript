goog.require('goog.testing.jsunit');
goog.require('goog.date.UtcDateTime');
goog.require('blog.controllers.CommentList');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');
goog.require('goog.dom');

var test_div, post, comment1, comment2;

function setUp(){
  test_div = goog.dom.getElement('test_div');
  post = new blog.models.Post();
  comment1 = new blog.models.Comment('Brian', 'brian.hartsock@gmail.com', 'http://blog.brianhartsock.com', 'I love this blog')
  comment2 = new blog.models.Comment('Brian2', 'brian.hartsock@gmail.com2', 'http://blog.brianhartsock.com2', 'I love this blog2')
  comment3 = new blog.models.Comment('Brian3', 'brian.hartsock@gmail.com3', 'http://blog.brianhartsock.com3', 'I love this blog3')
}

function tearDown(){
  test_div.innerHtml = "";
}

function test_can_show_initial_comment(){
  post.addComment(comment1);
  var comment_list = new blog.controllers.CommentList(post);

  comment_list.render(test_div);

  assertContains("I love this blog", test_div.innerHTML);
}

function test_can_show_two_initial_comments(){
  post.addComment(comment1);
  post.addComment(comment2);
  var comment_list = new blog.controllers.CommentList(post);

  comment_list.render(test_div);

  assertContains("I love this blog", test_div.innerHTML);
  assertContains("I love this blog2", test_div.innerHTML);
}

function test_comment_added_event_shows_new_comment_in_comment_list(){
  post.addComment(comment1);
  post.addComment(comment2);
  var comment_list = new blog.controllers.CommentList(post);

  comment_list.render(test_div);

  post.addComment(comment3);

  assertContains("I love this blog3", test_div.innerHTML);
}
