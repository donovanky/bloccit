const topic = require("./models").topic;

module.exports = {

//#1
  getAllTopics(callback){
    return Topics.all()

//#2
    .then((topic) => {
      callback(null, topic);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addTopics(newtopic, callback){
  return Topics.create({
    title: newtopic.title,
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
     return Topics.findById(id)
     .then((topic) => {
       callback(null, topic);
     })
     .catch((error) => {
       callback(error);
     })
   },

   deleteTopics(id, callback){
     return Topics.destroy({
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
