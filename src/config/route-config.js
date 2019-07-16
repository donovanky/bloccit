module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const TopicsRoutes = require("../routes/Topics");

    app.use(staticRoutes);
    app.use(TopicsRoutes);
  }
}
