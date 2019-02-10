// Initializes the `messengers` service on path `/messengers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/messengers.model');
const hooks = require('./messengers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/messengers', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('messengers');

  service.hooks(hooks);
};
