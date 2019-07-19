module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topic");

    app.use(staticRoutes);
    app.use(topicRoutes);
  }
}
