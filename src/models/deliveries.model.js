// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const deliveries = sequelizeClient.define('deliveries', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tracking_url: {
      type: DataTypes.STRING
    },
    pickup_destination: {
      type: DataTypes.JSONB
    },
    dropoff_destinations: {
      type: DataTypes.JSONB
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  deliveries.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    deliveries.belongsTo(models.companies),
    deliveries.hasMany(models.tasks);
  };

  return deliveries;
};
