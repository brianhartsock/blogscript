
goog.provide('blog.models.Model');

goog.require('goog.object');

/**
 * @constructor
 */
blog.models.Model = function(){

}

/**
 * @type {Object}
 * @protected
 */
blog.models.Model.prototype.validations_ = {};


/**
 * @returns {boolean} True or false depending on validation
 */
blog.models.Model.prototype.validate = function(){
  return goog.object.every(this.validations_, function(value, key){
      return value.isSatisfiedBy(this[key])
      }, this);
}

