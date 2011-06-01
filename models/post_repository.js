
goog.provide('blog.models.PostRepository');

goog.require('blog.models.Post');
goog.require('goog.storage.Storage');

/**
 * @param {!goog.storage.Storage} store Store for items
 * @constructor
 */
blog.models.PostRepository = function(store){
  /**
   * @type {!goog.storage.Storage}
   * @private
   */
  this.store_ = store;
}

/**
 * @returns {Array.<!blog.models.Post>}
 */
blog.models.PostRepository.prototype.getPosts = function(){
  var posts_meta = this.getPosts_();
  var posts = [];
  for(var i=0;i<posts_meta.length;i++){
    posts.push(
        new blog.models.Post(this.store_.get("/posts/" + posts_meta[i])));
  }
  return posts;
}

/**
 * @param {!blog.models.Post}
 */
blog.models.PostRepository.prototype.add = function(post){
  var posts_meta = this.getPosts_();
  var id = post.getId();

  if(goog.array.contains(posts_meta, id)){
    throw "Can't add post that already exists";
  }

  posts_meta.push(id);

  this.setPost_(id, post);
  this.setPosts_(posts_meta);
}

/**
 * @param {!blog.models.Post}
 */
blog.models.PostRepository.prototype.remove = function(post){
  var posts_meta = this.getPosts_();
  var id = post.getId();

  if(goog.array.remove(posts_meta, id)){
    this.setPosts_(posts_meta);
  }else{
    throw "Unable to remove item.  Not in repository";
  }

}

/**
 * @param {Array.<int>} posts_meta Listing of posts and IDs
 */
blog.models.PostRepository.prototype.setPosts_ = function(posts_meta){
  this.store_.set("/posts", posts_meta);
}

/**
 * @param {!int] id ID of post to set.
 * @param {blog.models.Post} post Post to set.
 */
blog.models.PostRepository.prototype.setPost_ = function(id, post){
  this.store_.set("/posts/" + id, post);
}

/**
 * @return {Object}
 */
blog.models.PostRepository.prototype.getPosts_ = function(){
  return this.store_.get("/posts") || [];
}

