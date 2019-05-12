// Initializes the `deliveries` service on path `/deliveries`
const createService = require('feathers-sequelize');
const createModel = require('../../models/deliveries.model');
const createTaskModel = require('../../models/tasks.model');
const hooks = require('./deliveries.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const Task = createTaskModel(app);
  //const paginate = app.get('paginate');

  const options = {
    Model,
  };

  const unassignedDeliveries = {
    async find(params) {
      return Model.findAll({
        where: {
          companyId: params.query.companyId, 
          messengerId: null,
          state: 0,
        },
        include: [{model: Task, as: 'tasks'}],
        order: [[{ model: Task, as: 'tasks' }, 'order', 'ASC' ]],
      });
    } 
  };

  const deliveryAndTasks = {
    async find(params) {
      return Model.findAll({
        where: {id: params.query.deliveryId},
        include: [{
          model: Task,
          as: 'tasks',
        },]
      });
    } 
  };

  const messengerDeliveries = {
    async find(params) {
      return Model.findAll({
        where: {messengerId: params.query.messengerId},
        include: [{
          model: Task,
          as: 'tasks',
          where:{
            state: [1, 2]
          },
          order: [[{ model: Task, as: 'tasks' }, 'order', 'ASC' ]],
        },]
      });
    } 
  };

  const deliveryHistory = {
    async find(params) {
      return Model.findAll({
        where: {messengerId: params.query.messengerId},
        include: [{
          model: Task,
          as: 'tasks',
          where: {state: 3},
        },]
      });
    } 
  };

  // Initialize our service with any options it requires
  app.use('/deliveries', createService(options));
  app.use('/unassigned_deliveries', unassignedDeliveries);
  app.use('/messenger_deliveries', messengerDeliveries);
  app.use('/messenger_history', deliveryHistory);
  app.use('/deliveries_and_tasks', deliveryAndTasks);
  // Get our initialized service so that we can register hooks
  const service = app.service('deliveries');

  service.hooks(hooks);
};
