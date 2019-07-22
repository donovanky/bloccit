const Advertisement = require("./models").Advertisement;

module.exports = {

//#1
  getAllTopics(callback){
    return Advertisement.all()

//#2
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addTopics(newTopic, callback){
    return Advertisement.create({
    title: newAdvertisement.title,
    description: newAdvertisement.description
      })
    .then((advertisement) => {
    callback(null, advertisement);
      })
    .catch((error) => {
    callback(error);
    })
  },

  getTopics(id, callback){
     return Advertisement.findById(id)
     .then((advertisement) => {
       callback(null, advertisement);
     })
     .catch((error) => {
       callback(error);
     })
   },

   deleteTopics(id, callback){
     return Advertisement.destroy({
       where: {id}
     })
     .then((advertisement) => {
       callback(null, advertisement);
     })
     .catch((error) => {
       callback(error);
     })
   },

   updateTopic(id, updatedAdvertisement, callback){
     return Advertisement.findById(id)
     .then((advertisement) => {
       if(!advertisement){
         return callback("Advertisement not found");
       }

       advertisement.update(updatedAdvertisement, {
         fields: Object.keys(updatedAdvertisement)
       })
       .then(() => {
         callback(null, advertisement);
       })
       .catch((error) => {
         callback(error);
       });
     });
   }

}
