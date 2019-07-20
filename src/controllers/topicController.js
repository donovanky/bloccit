const topicQueries = require("../db/queries.topic.js");

module.exports = {
  index(request, response, next){
     topicQueries.getAllTopics((error, topics) => {
//#3
       if(error){
         response.redirect(500, "static/index");
       } else {
         response.render("topics/index", {topics});
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
     response.redirect(303, `/topics/${topic.id}`);
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
         response.redirect(500, `/topics/${topic.id}`)
       } else {
         response.redirect(303, "/topics")
       }
     });
   },

   edit(request, response, next){
     topicQueries.getTopics(request.params.id, (error, topic) => {
       if(error || topic == null){
         response.redirect(404, "/");
       } else {
         response.render("topics/edit", {topic});
       }
     });
   },

   update(request, response, next){

   //#1
        topicQueries.updateTopic(request.params.id, request.body, (error, topic) => {

   //#2
          if(error || topic == null){
            response.redirect(404, `/topics/${request.params.id}/edit`);
          } else {
            request.redirect(`/topics/${topic.id}`);
          }
        });
      }

}
