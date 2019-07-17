const Topics = require("./models").Topics;

module.exports = {

//#1
  getAllTopics(callback){
    return Topics.all()

//#2
    .then((Topics) => {
      callback(null, Topics);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addTopics(newTopics, callback){
  return Topics.create({
    title: newTopics.title,
    description: newTopics.description
  })
  .then((Topics) => {
    callback(null, Topics);
  })
  .catch((err) => {
    callback(err);
  })
},

getTopics(id, callback){
     return Topics.findById(id)
     .then((Topics) => {
       callback(null, Topics);
     })
     .catch((error) => {
       callback(error);
     })
   },

   deleteTopics(id, callback){
     return Topics.destroy({
       where: {id}
     })
     .then((Topics) => {
       callback(null, Topics);
     })
     .catch((err) => {
       callback(err);
     })
   },



}
