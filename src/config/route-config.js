module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const TopicsRoutes = require("../routes/topic");

    app.use(staticRoutes);
    app.use(TopicsRoutes);
  }
}
