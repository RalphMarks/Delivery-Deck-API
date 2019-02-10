// Initializes the `deliveries` service on path `/deliveries`
const createService = require('feathers-sequelize');
const createModel = require('../../models/deliveries.model');
const hooks = require('./deliveries.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/deliveries', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('deliveries');

  service.hooks(hooks);
};
