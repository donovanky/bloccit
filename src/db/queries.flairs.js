const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {

  getFlair(callback){
    return Flair.findAll()

    .then((flairs) => {
      callback(null, flairs);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addFlair(newFlair, callback){
       return Flair.create(newFlair)
       .then((flair) => {
         callback(null, flair);
       })
       .catch((error) => {
         callback(error);
       })
     },

  getFlair(id, callback){
    return Flair.findByPk(id)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((error) => {
      callback(error);
    })
  },

  deleteFlair(id, callback){
      return Flair.destroy({
        where: { id }
      })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((error) => {
        callback(error);
      })
    },

  updateFlair(id, updatedFlair, callback){
    return Flair.findByPk(id)
    .then((flair) => {
      if(!flair){
        return callback("Flair not found");
      }

      flair.update(updatedFlair, {
        fields: Object.keys(updatedFlair)
      })
      .then(() => {
        callback(null, flair);
      })
      .catch((error) => {
        console.log(error);
        console.log(updatedFlair);
        callback(error);
      });
    });
  },

}
