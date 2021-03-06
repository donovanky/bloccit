const Advertisement = require("./models").Advertisement;

module.exports = {

//#1
  getAllAdvertisements(callback){
    return Advertisement.findAll()

//#2
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((error) => {
      callback(error);
    })
  },

  addAdvertisement(newAdvertisement, callback){
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

  getAdvertisement(id, callback){
     return Advertisement.findByPk(id)
     .then((advertisement) => {
       callback(null, advertisement);
     })
     .catch((error) => {
       callback(error);
     })
   },

   deleteAdvertisement(id, callback){
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

   updateAdvertisement(id, updatedAdvertisement, callback){
     return Advertisement.findByPk(id)
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
