'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
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
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic, {
      foreignKey: "TopicsId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};
