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
       console.log("8.27!!!!!!!!!!!!!!" + error);
       callback(error);
     })
   },

   deleteTopics(id, callback){
     return Topic.destroy({
       where: {id}
     })
     .then((topic) => {
       callback(null, topic);
     })
     .catch((error) => {
       callback(error);
     })
   },

   updateTopic(id, updatedTopic, callback){
     return Topic.findByPk(id)
     .then((topic) => {
       if(!topic){
         return callback("Topic not found");
       }

       topic.update(updatedTopic, {
         fields: Object.keys(updatedTopic)
       })
       .then(() => {
         callback(null, topic);
       })
       .catch((error) => {
         callback(error);
       });
     });
   }

}
