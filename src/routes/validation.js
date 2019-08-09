module.exports = {
  validatePosts(request, response, next) {

//#1
    if(request.method === "POST") {

//#2
      request.checkParams("topicId", "must be valid").notEmpty().isInt();
      request.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      request.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
    }

//#3
    const errors = request.validationErrors();

    if (errors) {

//#4
      request.flash("error", errors);
      return response.redirect(303, request.headers.referer)
    } else {
      return next();
    }
  }
}
