
goog.provide('blog.Specification');
goog.provide('blog.NotEmptySpecification');

goog.require('goog.string');

/**
 * @constructor
 */
blog.Specification = function(){}

/**
 * @param {*} obj Object to check specification against
 * @return {boolean} Whether or not object meets specification
 */
blog.Specification.prototype.isSatisfiedBy = function(obj){
  return true;
}

/**
 * @extends {blog.Specification}
 * @constructor
 */
blog.NotEmptySpecification = function(){
}
goog.inherits(blog.NotEmptySpecification, blog.Specification);

/**
 * @inheritsDoc
 */
blog.NotEmptySpecification.prototype.isSatisfiedBy = function(obj){
  if(goog.typeOf(obj) == 'string'){
    /** @type {string} */
    obj;
    return !goog.string.isEmpty(obj);
  }
  else{
    return false;
  }
}

