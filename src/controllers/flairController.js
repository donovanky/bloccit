const postQueries = require("../db/queries.posts.js");
const flairQueries = require("../db/queries.flairs.js")

module.exports = {
  index(request, response, next){
    flairQueries.getAllFlairs((error, flairs) => {
      if(error){
        console.log(error)
        response.redirect(500, "static/index");
      } else {
        response.render("flairs/index", {flairs});
      }
    })
  },

  new(request, response, next){
     response.render("flairs/new", {
       //topicId: request.params.topicId,
       //postId: request.params.postId
     });
   },

  create(request, response, next){
    let newFlair= {
      name: request.body.name,
      color: request.body.color,
      //topicId: request.params.topicId,
      //postId: request.params.postId
    };
    flairQueries.addFlair(newFlair, (error, flair) => {
      if(error){
        response.redirect(500, "/flairs/new");
      } else {
        response.redirect(303, `/flairs/${flair.id}`);
      }
    });
  },

  show(request, response, next){
    flairQueries.getFlair(request.params.id, (error, flair) => {
      if(error || flair == null){
        console.log(error);
        response.redirect(404, "/flairs");
      } else {
        response.render("flairs/show", {
          flair,
          //topicId: request.params.topicId,
          //postId: request.params.postId
        });
      }
    });
  },

  edit(request, response, next){
    flairQueries.getFlair(request.params.id, (error, flair) => {
      if(error || flair == null){
        response.redirect(404, "/flairs/");
      } else {
        response.render("flairs/edit", {flair});
      }
    });
  },

  destroy(request, response, next){
  flairQueries.deleteFlair(request.params.id, (error, flair) => {
    if(error){
      response.redirect(500, "/flairs/:id");
    } else {
      response.redirect(303, `/flairs/`)
    }
  });
},

update(request, response, next){
  flairQueries.updateFlair(request.params.id, request.body, (error, flair) => {
    if(error || flair == null){
      response.redirect(404, `/flairs/`);
    } else {
      response.redirect(`/flairs/${request.params.id}`);
    }
  });
},



}
