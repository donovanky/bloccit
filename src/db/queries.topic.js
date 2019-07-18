const Topic = require("./models").Topic;

module.exports = {

//#1
  getAllTopics(callback){
    return Topic.all()

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
    description: newtopic.description
  })
  .then((topic) => {
    callback(null, topic);
  })
  .catch((error) => {
    callback(error);
  })
},

getTopics(id, callback){
     return Topic.findById(id)
     .then((topic) => {
       callback(null, topic);
     })
     .catch((error) => {
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



}
