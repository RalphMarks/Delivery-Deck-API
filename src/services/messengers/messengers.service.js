/* eslint-disable no-unused-vars */
// Initializes the `messengers` service on path `/messengers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/messengers.model');
const createLocationModel = require('../../models/locations.model');
//const createDeliveryModel = require('../../models/deliveries.model');
//const createTaskModel = require('../../models/tasks.model');
const hooks = require('./messengers.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  //(const Delivery = createDeliveryModel(app);
  //const Task = createTaskModel(app);
  const Location = createLocationModel(app);

  const options = {
    Model,
  };

  const messengersWithLocations = {
    async find(params) {
      return Model.findAll({
        where: {companyId: params.query.companyId},
        include: [{
          model: Location,
          as: 'location',
        },]
      });
    } 
  };

  const messengerWithLocations = {
    async get(id, params) {
      return Model.findAll({
        where: {id: id},
        include: [{
          model: Location,
          as: 'location',
        },]
      });
    } 
  };

  const messengersSMS = {
    async create(data, params) {
      const {messenger} = data;

      const accountSid = 'AC952f5a351482e8c2befdd138e733d2bd'; // Your Account SID from www.twilio.com/console
      const authToken = '17258e41a41ddeab7a962be30494e8d6';   // Your Auth Token from www.twilio.com/console
      const twilio = require('twilio');
      const client = new twilio(accountSid, authToken);
      
      client.messages.create({
        body: `Tu contraseña temporal es: ${messenger.password}`,
        to: `+52${messenger.phone}`,  // Text this number
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

  const updateOnDuty = {
    async patch(messengerId, data) {
      return Model.update(data, {where:{id: messengerId}}).then(() => {
        return Model.findByPk(messengerId);
      });
    },
  };
  
  // Initialize our service with any options it requires
  app.use('/messengers', createService(options));
  app.use('/messengers_with_locations', messengersWithLocations);
  app.use('/messenger_with_locations', messengerWithLocations);
  app.use('/messengers_sms', messengersSMS);
  app.use('/update_messenger_status', updateOnDuty);

  // Get our initialized service so that we can register hooks
  const service = app.service('messengers');

  service.hooks(hooks);
};
