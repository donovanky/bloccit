 const topicQueries = require("../db/queries.topic.js");

 module.exports = {
   index(request, response, next){
//#2
      topicQueries.getAllTopics((error, topic) => {
//#3
        if(error){
          response.redirect(500, "static/index");
        } else {
          response.render("topics/index", {topic});
        }
      })
   },

   new(request, response, next){
      response.render("topics/new");
    },

    create(request, response, next){
  let newtopic = {
    title: request.body.title,
    description: request.body.description
  };
  topicQueries.addTopics(newtopic, (error, topic) => {
    if(error){
      response.redirect(500, "/topics/new");
    } else {
      response.redirect(303, `/topics/${Topics.id}`);
    }
  });
},
show(request, response, next){
//#1
   topicQueries.getTopics(request.params.id, (error, topic) => {
//#2
     if(error || topic == null){
       response.redirect(404, "/");
     } else {
       response.render("topics/show", {topic});
     }
   });
 },

 destroy(request, response, next){
      topicQueries.deleteTopics(request.params.id, (error, topic) => {
        if(error){
          response.redirect(500, `/topics/${Topics.id}`)
        } else {
          response.redirect(303, "/topics")
        }
      });
    },



 }
