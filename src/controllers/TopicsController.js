
 const TopicsQueries = require("../db/queries.Topics.js");

 module.exports = {
   index(request, response, next){

//#2
      TopicsQueries.getAllTopics((error, Topics) => {

//#3
        if(error){
          response.redirect(500, "static/index");
        } else {
          response.render("Topics/index", {Topics});
        }
      })
   }
 }
