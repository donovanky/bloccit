'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
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
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topics, {
      foreignKey: "TopicsId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};
