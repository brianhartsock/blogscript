// This file was automatically generated from post.soy.
// Please don't edit this file by hand.

goog.provide('blog.views.Post');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
blog.views.Post.details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><h1>', soy.$$escapeHtml(opt_data.post.title), '</div><p>', soy.$$escapeHtml(opt_data.post.content), '</div></div>');
  if (!opt_sb) return output.toString();
};
