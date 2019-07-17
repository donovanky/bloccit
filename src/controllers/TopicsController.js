
 const TopicsQueries = require("../db/queries.topic.js");

 module.exports = {
   index(request, response, next){
//#2
      TopicsQueries.getAllTopics((error, topic) => {
//#3
        if(error){
          response.redirect(500, "static/index");
        } else {
          response.render("topic/index", {Topics});
        }
      })
   },

   new(request, response, next){
      response.render("topic/new");
    },

    create(request, response, next){
  let newtopic = {
    title: request.body.title,
    description: request.body.description
  };
  TopicsQueries.addTopics(newtopic, (error, topic) => {
    if(error){
      response.redirect(500, "/topic/new");
    } else {
      response.redirect(303, `/topic/${Topics.id}`);
    }
  });
},
show(request, response, next){
//#1
   TopicsQueries.getTopics(request.params.id, (error, topic) => {
//#2
     if(error || topic == null){
       response.redirect(404, "/");
     } else {
       response.render("topic/show", {topic});
     }
   });
 },

 destroy(request, response, next){
      TopicsQueries.deleteTopics(request.params.id, (error, Topics) => {
        if(error){
          response.redirect(500, `/topics/${Topics.id}`)
        } else {
          response.redirect(303, "/topics")
        }
      });
    },



 }
