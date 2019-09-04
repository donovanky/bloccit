module.exports = {

// #1
  fakeIt(app){
// #2
    let role, id, email;

// #3
    function middleware(request,response,next){

// #4
      role = request.body.role || role;
      id = request.body.userId || id;
      email = request.body.email || email;

// #5
      if(id && id != 0){
        request.user = {
          "id": id,
          "email": email,
          "role": role
        };
      } else if(id == 0) {
        delete request.user;
      }

      if( next ){ next() }
    }

// #6
    function route(request,response){
      response.redirect("/")
    }

// #7
    app.use(middleware)
    app.get("/auth/fake", route)
  }
}
