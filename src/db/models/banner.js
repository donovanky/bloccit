'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    TopicsId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "topic",
        key: "id",
        as: "TopicsId",
      }
    }
  }, {});
  Banner.associate = function(models) {
    Banner.belongsTo(models.topic, {
      foreignKey: "TopicsId",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};
