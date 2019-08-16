const bcrypt = require("bcryptjs");

module.exports = {

// #1
  ensureAuthenticated(request, response, next) {
    if (!request.user){
      request.flash("notice", "You must be signed in to do that.")
      return response.redirect("/users/sign_in");
    } else {
      next();
    }
  },

// #2
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}
