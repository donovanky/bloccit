
 const topicQueries = require("../db/queries.topics.js");

 module.exports = {
   index(request, response, next){

//#2
      topicQueries.getAllTopics((error, topics) => {

//#3
        if(error){
          response.redirect(500, "static/index");
        } else {
          response.render("topics/index", {topics});
        }
      })
   }
 }
