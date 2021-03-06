const topicQueries = require("../db/queries.topics.js");

const Authorizer = require("../policies/topic");

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
     const authorized = new Authorizer(request.user).new();

     if(authorized){
       response.render("topics.new");
     } else {
       request.flash("notice", "You are not authorized to do that.");
       response.redirect(`/topics`);
     }
   },

   create(request, response, next){
     const authorized = new Authorizer(request.user).create();

     if(authorized) {
       let newTopic = {
         title: request.body.title,
         description: request.body.description
       };
       topicQueries.addTopic(newTopic, (error, topic) => {
         if(error){
           res.redirect(500, "topics/new");
         } else {
           response.redirect(303, `/topics/${topic.id}`);
         }
       });
     } else {

       request.flash("notice", "You are not authorized to do that.");
       response.redirect("/topics");
     }
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
     topicQueries.deleteTopic(request, (error, topic) => {
       if(error){
         response.redirect(error, `/topics/${req.params.id}`)
       } else {
         response.redirect(303, "/topics")
       }
     });
   },

   edit(request, response, next){

   topicQueries.getTopic(req.params.id, (error, topic) => {
     if(error || topic == null){
       response.redirect(404, "/");
     } else {

       const authorized = new Authorizer(request.user, topic).edit();

       if(authorized){
         response.render("topics/edit", {topic});
       } else {
         request.flash("You are not authorized to do that.")
         response.redirect(`/topics/${request.params.id}`)
       }
     }
   });
 },

   update(request, response, next){

   //#1
        topicQueries.updateTopic(request.params.id, request.body, (error, topic) => {

   //#2
          if(error || topic == null){
            response.redirect(401, `/topics/${request.params.id}/edit`);
          } else {
            response.redirect(`/topics/${topic.id}`);
          }
        });
      },

}
