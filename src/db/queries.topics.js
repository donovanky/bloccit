const Topic = require("./models").Topic;

const Post = require("./models").Post;

module.exports = {

//#1
  getAllTopics(callback){
    return Topic.findAll()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addTopics(newTopic, callback){
    return Topic.create({
    title: newTopic.title,
    description: newTopic.description
      })
    .then((topic) => {
    callback(null, topic);
      })
    .catch((error) => {
    callback(error);
    })
  },

  getTopics(id, callback){
     return Topic.findByPk(id, {
       include: [{
         model: Post,
         as: "posts"
       }]
     })
     .then((topic) => {
       callback(null, topic);
     })
     .catch((error) => {
       callback(error);
     })
   },

   deleteTopic(request, callback){
     return Topic.findByPk(request.params.id)
     .then((topic) => {
       const authorized = new Authorizer(request.user, topic).destroy();
       if(authorized) {
         topic.destroy()
         .then((response) => {
           callback(null,topic);
         });
       } else {
         request.flash("notice", "You are not authorized to do that.")
         callback(401);
       }
     })
     .catch((error) => {
       callback(error);
     });
   },

   updateTopic(id, updatedTopic, callback){
     return Topic.findByPk(request.params.id)
     .then((topic) => {
       if(!topic){
         return callback("Topic not found");
       }

       const authorized = new Authorizer(req.user, topic).update();
       if(authorized){
         topic.update(updateTopic, {
           fields: Object.keys(updatedTopic)
         })
         .then(() => {
           callback(null, topic);
         })
         .catch((err) => {
           callback(err);
         });
       } else {
         request.flash("notice", "You are not authorized to do that.");
         callback("Forbidden");
       }
     });
   },

}
