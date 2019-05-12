// Initializes the `tasks` service on path `/tasks`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  //const paginate = app.get('paginate');

  const options = {
    Model,
  };

  const updateTask = {
    async patch(taskId, data) {
      return Model.update(data, {where:{id: taskId}}).then(() => {
        return Model.findByPk(taskId);
      });
    },
  };


  const activeTaskTrackingPage = {
    // eslint-disable-next-line no-unused-vars
    async create(data, params) {
      const {taskId, phone, id} = data;
      const accountSid = 'AC952f5a351482e8c2befdd138e733d2bd'; // Your Account SID from www.twilio.com/console
      const authToken = '17258e41a41ddeab7a962be30494e8d6';   // Your Auth Token from www.twilio.com/console
      const twilio = require('twilio');
      const client = new twilio(accountSid, authToken);

      client.messages.create({
        body: `Tu paquete esta en camino y deberia llegar cerca. Sigue a tu mensajero aqui: https://e7f19269.ngrok.io/tracking/${taskId}+${id}`,
        to: `+52${phone}`,  // Text this number
        from: '+12132386534' // From a valid Twilio number
      })
        .then((message) => {
          // eslint-disable-next-line no-console
          console.log(message);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });

      return {status: 'ok'};
    }
  };


  // Initialize our service with any options it requires
  app.use('/tasks', createService(options));
  app.use('/update_task_state', updateTask);
  app.use('/send_tracking_page_sms', activeTaskTrackingPage);

  // Get our initialized service so that we can register hooks
  const service = app.service('tasks');

  service.hooks(hooks);
};
