goog.require('goog.testing.jsunit');
goog.require('goog.date.UtcDateTime');
goog.require('blog.controllers.AddComment');
goog.require('blog.models.Post');
goog.require('blog.models.Comment');
goog.require('goog.dom');

VALID_EMAIL = "test@email.com";
VALID_NAME = "Test Name";
VALID_WEBAPGE = "http://test.com";
VALID_CONTENT = "Test Content";

function withValidCommentIn(form){
  form.name.value = VALID_NAME;
  form.email.value = VALID_EMAIL;
  form.webpage.value = VALID_WEBAPGE;
  form.content.value = VALID_CONTENT;
}

function setUp(){
  test_div = goog.dom.getElement('test_div');
  post = new blog.models.Post();

  add_comment_controller = new blog.controllers.AddComment(post);
  add_comment_controller.render(test_div);

  form = add_comment_controller.getElement();
  withValidCommentIn(form);
}

function tearDown(){
  test_div.innerHtml = "";
}

function test_name_is_saved_to_comment(){
  //TODO - Figure out how to really submit
  add_comment_controller.submit();

  assertEquals(VALID_NAME, post.getComments()[0].getName());
}

function test_webpage_is_saved_to_comment(){
  add_comment_controller.submit();

  assertEquals(VALID_WEBAPGE, post.getComments()[0].getWebpage());
}

function test_email_is_saved_to_comment(){
  add_comment_controller.submit();

  assertEquals(VALID_EMAIL, post.getComments()[0].getEmail());
}

function test_content_is_saved_to_comment(){
  add_comment_controller.submit();

  assertEquals(VALID_CONTENT, post.getComments()[0].getContent());
}

function test_adding_comment_clears_form(){
  add_comment_controller.submit();

  assertFormIsEmpty(form);
}

function assertFormIsEmpty(form){
  assertEquals(form.name.value, "");
  assertEquals(form.email.value, "");
  assertEquals(form.webpage.value, "");
  assertEquals(form.content.value, "");
}
