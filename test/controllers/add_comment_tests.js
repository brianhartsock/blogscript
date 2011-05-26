goog.require('goog.testing.jsunit');
goog.require('goog.date.UtcDateTime');
goog.require('blog.controllers.AddComment');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');
goog.require('goog.dom');

var test_div, post, add_comment_controller;

function setUp(){
  test_div = goog.dom.getElement('test_div');
  post = new blog.models.Post();

  add_comment_controller = new blog.controllers.AddComment(post);
  add_comment_controller.render(test_div);
}

function tearDown(){
  test_div.innerHtml = "";
}

function test_name_is_saved_to_comment(){
  var form = add_comment_controller.getElement();

  //TODO - Figure out how to really submit
  form.name.value = "test value";
  add_comment_controller.submit();

  assertEquals("test value", post.getComments()[0].getName());
}

function test_webpage_is_saved_to_comment(){
  var form = add_comment_controller.getElement();

  //TODO - Figure out how to really submit
  form.webpage.value = "http://test.com";
  add_comment_controller.submit();

  assertEquals("http://test.com", post.getComments()[0].getWebpage());
}

function test_email_is_saved_to_comment(){
  var form = add_comment_controller.getElement();

  //TODO - Figure out how to really submit
  form.email.value = "test@value.com";
  add_comment_controller.submit();

  assertEquals("test@value.com", post.getComments()[0].getEmail());
}

function test_content_is_saved_to_comment(){
  var form = add_comment_controller.getElement();

  //TODO - Figure out how to really submit
  form.content.value = "Test content"
  add_comment_controller.submit();

  assertEquals("Test content", post.getComments()[0].getContent());
}

function test_adding_comment_clears_form(){
  var form = add_comment_controller.getElement();
  form.name.value = "name";
  form.email.value = "name";
  form.webpage.value = "name";
  form.content.value = "name";

  add_comment_controller.submit();

  assertFormIsEmpty(form);
}

function assertFormIsEmpty(form){
  assertEquals(form.name.value, "");
  assertEquals(form.email.value, "");
  assertEquals(form.webpage.value, "");
  assertEquals(form.content.value, "");
}
