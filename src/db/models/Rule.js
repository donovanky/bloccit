'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    TopicsId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "topic",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};
