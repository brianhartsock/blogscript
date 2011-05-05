// This file was automatically generated from comment.soy.
// Please don't edit this file by hand.

goog.provide('blog.views.Comment');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
blog.views.Comment.details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div>', soy.$$escapeHtml(opt_data.comment.content), '</div>');
  if (!opt_sb) return output.toString();
};
