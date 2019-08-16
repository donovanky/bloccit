const RuleQueries = require("../db/queries.Rule.js");

 module.exports = {
   index(request, response, next){

//#2
      RuleQueries.getAllTopics((error, Rule) => {

//#3
        if(error){
          response.redirect(500, "static/index");
        } else {
          response.render("Rule/index", {Rule});
        }
      })
   }
 }
