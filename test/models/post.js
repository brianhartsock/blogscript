goog.require('goog.testing.jsunit');
goog.require('goog.date.UtcDateTime');
goog.require('blog.models.Post');
goog.require('blog.models.Post.EventType');
goog.require('blog.models.Comment');

var post, comment;

function setUp(){
  post = new blog.models.Post();
  comment = new blog.models.Comment("asdf");
}


function test_can_set_body(){
  post.setBody("test");

  assertEquals("Body not saved", "test", post.getBody());
}

function test_can_set_title(){
  var b = new blog.models.Post();

  post.setHeader('test');

  assertEquals('header saved', 'test', post.getHeader());
}

function test_can_add_comment(){
  post.addComment(comment);

  assertContains(comment, post.getComments());
}

function test_date_posted_set_when_adding(){
  var dt = new goog.date.UtcDateTime();
  post.addComment(comment);

  assert(dt <= comment.date_posted);
}

function test_isPosted_returns_true_after_adding_comment(){
  var dt = new goog.date.UtcDateTime();
  post.addComment(comment);

  assertTrue(comment.isPosted());
}

function test_addComment_triggers_comment_added_event(){
  var listenerWasCalled = false;

  post.addEventListener(blog.models.Post.EventType.COMMENT_ADDED, function(e){
    listenerWasCalled = true;
  });
  post.addComment(comment);

  assert(listenerWasCalled);
}
