goog.require('goog.testing.jsunit');
goog.require('blog.models.PostRepository');
goog.require('goog.storage.mechanism.HTML5LocalStorage');

function setUp(){
  mechanism = new goog.storage.mechanism.HTML5LocalStorage();
  storage = new goog.storage.Storage(mechanism);
  mechanism.clear();

  repository = new blog.models.PostRepository(storage);
}

function test_can_retrieve_blog_after_adding(){
  assertEquals(0, repository.getPosts().length);

  var post = new blog.models.Post();
  post.setBody("test");
  
  repository.add(post);

  var posts = repository.getPosts();
  assertEquals(1, posts.length);
  assertEquals("test", posts[0].getBody());
}

function test_cant_add_object_with_same_id_as_already_exists(){
  var post = new blog.models.Post();

  repository.add(post);
  assertThrows(
    function(){
      repository.add(post)
    });
}

function test_removing_object_removes_it_from_post_list(){
  var post = new blog.models.Post();
  repository.add(post);
  assertEquals(post.getId(), repository.getPosts()[0].getId());
  repository.remove(post);
  assertEquals(0, repository.getPosts().length);
}

function test_cant_remove_object_that_isnt_added_to_repo(){
  var post = new blog.models.Post();
  
  assertThrows(
      function(){
        repository.remove(post);
      });
}
