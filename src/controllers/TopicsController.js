
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
   },

   new(request, response, next){
      response.render("Topics/new");
    },

    create(request, response, next){
  let newTopics = {
    title: request.body.title,
    description: request.body.description
  };
  TopicsQueries.addTopics(newTopics, (error, Topics) => {
    if(error){
      response.redirect(500, "/Topics/new");
    } else {
      response.redirect(303, `/Topics/${Topics.id}`);
    }
  });
},
show(request, response, next){
//#1
   TopicsQueries.getTopics(request.params.id, (error, Topics) => {
//#2
     if(error || Topics == null){
       response.redirect(404, "/");
     } else {
       response.render("Topics/show", {Topics});
     }
   });
 },

 destroy(request, response, next){
      TopicsQueries.deleteTopics(request.params.id, (error, Topics) => {
        if(error){
          response.redirect(500, `/Topics/${Topics.id}`)
        } else {
          response.redirect(303, "/Topics")
        }
      });
    },



 }
