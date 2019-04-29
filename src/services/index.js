const users = require('./users/users.service.js');
const companies = require('./companies/companies.service.js');
const messengers = require('./messengers/messengers.service.js');
const deliveries = require('./deliveries/deliveries.service.js');
const tasks = require('./tasks/tasks.service.js');
const destinations = require('./destinations/destinations.service.js');
const locations = require('./locations/locations.service.js');
const mailer = require('./mailer/mailer.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(companies);
  app.configure(messengers);
  app.configure(deliveries);
  app.configure(tasks);
  app.configure(destinations);
  app.configure(locations);
  app.configure(mailer);
};
