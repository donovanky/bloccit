'use strict';
module.exports = (sequelize, DataTypes) => {
  var topic = sequelize.define('topic', {
  title: DataTypes.STRING,
  description: DataTypes.STRING
  }, {});
  Topics.associate = function(models) {
    Topics.hasMany(models.Banner, {
      foreignKey: "TopicsId",
      as: "banners",
    });
  Topics.hasMany(models.Rule, {
    foreignKey: "TopicsId",
    as: "Rules",
    });
  };
  return topic;
};
