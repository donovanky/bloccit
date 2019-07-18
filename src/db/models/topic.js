'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
  title: DataTypes.STRING,
  description: DataTypes.STRING
  }, {});
  topic.associate = function(models) {
    topic.hasMany(models.Banner, {
      foreignKey: "TopicsId",
      as: "banners",
    });
  topic.hasMany(models.Rule, {
    foreignKey: "TopicsId",
    as: "Rules",
    });
  };
  return topic;
};
