'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topics = sequelize.define('Topics', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topics.associate = function(models) {
    Topics.hasMany(models.Banner, {
      foreignKey: "TopicsId",
      as: "banners",
    });
  };
  return Topics;
};
