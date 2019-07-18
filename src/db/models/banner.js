'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "TopicsId",
      }
    }
  }, {});
  Banner.associate = function(models) {
    Banner.belongsTo(models.Topic, {
      foreignKey: "TopicsId",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};
