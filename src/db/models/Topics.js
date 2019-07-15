'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topics = sequelize.define('Topics', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    TopicsId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "TopicsId",
      }
    }
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
  return Topics;
};
