// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tasks = sequelizeClient.define('tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    started_at: {
      type: DataTypes.DATE,
    },
    finished_at: {
      type: DataTypes.DATE,
    },
    is_pickup: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    succeded:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    order:{
      type: DataTypes.INTEGER,
    },
    attrs: {
      type: DataTypes.JSONB,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  tasks.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    //tasks.belongsTo(models.deliveries);
    //tasks.belongsTo(models.destinations);
  };

  return tasks;
};
