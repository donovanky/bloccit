module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const TopicsRoutes = require("../routes/Topics");
    const RuleRoutes = require("../routes/Rule");

    app.use(staticRoutes);
    app.use(TopicsRoutes);
    app.use(RuleRoutes);
  }
}
