const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
  index(request, response, next){
     advertisementQueries.getAllAdvertisements((error, advertisements) => {
//#3
       if(error){
         response.redirect(500, "static/index");
       } else {
         response.render("advertisements/index", {advertisements});
       }
     })
  },

  new(request, response, next){
     response.render("advertisements/new");
   },

   create(request, response, next){
     let newAdvertisement = {
   title: request.body.title,
   description: request.body.description
 };
 advertisementQueries.addAdvertisement(newAdvertisement, (error, advertisement) => {
   if(error){
     response.redirect(500, "/advertisements/new");
   } else {
     response.redirect(303, `/advertisements/${advertisement.id}`);
   }
 });
},
show(request, response, next){
//#1
  advertisementQueries.getAdvertisement(request.params.id, (error, advertisement) => {
//#2
    if(error || advertisement == null){
      response.redirect(404, "/");
    } else {
      response.render("advertisements/show", {advertisement});
    }
  });
},

destroy(request, response, next){
     advertisementQueries.deleteTopics(request.params.id, (error, advertisement) => {
       if(error){
         response.redirect(500, `/advertisements/${advertisement.id}`)
       } else {
         response.redirect(303, "/advertisements")
       }
     });
   },

   edit(request, response, next){
     advertisementQueries.getAdvertisement(request.params.id, (error, advertisement) => {
       if(error || advertisement == null){
         response.redirect(404, "/");
       } else {
         response.render("advertisements/edit", {advertisement});
       }
     });
   },

   update(request, response, next){

   //#1
        advertisementQueries.updateAdvertisement(request.params.id, request.body, (error, advertisement) => {

   //#2
          if(error || advertisement == null){
            response.redirect(404, `/advertisements/${request.params.id}/edit`);
          } else {
            request.redirect(`/advertisements/${advertisement.id}`);
          }
        });
      }

}
