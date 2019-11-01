const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {
  create(request, response, next){

    const authorized = new Authorizer(request.user).create();

    if(authorized) {


      let newComment = {
        body: request.body.body,
        userId: request.user.id,
        postId: request.params.postId
      };


      commentQueries.createComment(newComment, (error, comment) => {

        if(error){
          request.flash("error", error);
        }
        response.redirect(request.headers.referer);
      });
    } else {
      request.flash("notice", "You must be signed in to do that.")
      request.redirect("/users/sign_in");
    }
  },

  destroy(request, response, next){
    commentQueries.deleteComment(request, (error, comment) => {
      if(error){
        response.redirect(error, request.headers.referer);
      } else {
        response.redirect(request.headers.referer);
      }
    });
  }
}
