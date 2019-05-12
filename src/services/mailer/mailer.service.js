/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// Initializes the `mailer` service on path `/mailer`
//const createService = require('./mailer.class.js');
//const hooks = require('./mailer.hooks');
const sgMail = require('@sendgrid/mail');

module.exports = function (app) {

  const sendEmail = {
    // eslint-disable-next-line no-unused-vars
    async create(data, params) {
      sgMail.setApiKey('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');

      // eslint-disable-next-line no-console
      console.log(data);

      const msg = {
        to: data.user_email,
        from: 'noreply@deliverydeck.com',
        subject: 'Activa tu cuenta ',
        text: 'Hello plain world!',
        html: '<p>Hello HTML world!</p>',
        templateId: 'd-f8e0703a6f0f47ecb93afe07ac495658',
        dynamic_template_data: {
          user_name: data.user_name,
          user_email:  data.user_email,
          dashboard_url:  data.dashboard_url,
          user_token: data.user_token,
        }
      };

      // eslint-disable-next-line no-console
      //console.log('------');
      // eslint-disable-next-line no-console
      //console.log(msg);

      sgMail.send(msg)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Success');
        })
        .catch(error => {

          //Log friendly error
          console.error(error.toString());

          //Extract error msg
          const {message, code, response} = error;

          //Extract response msg
          const {headers, body} = response;
        });

      return {status: 'result'};
    }
  };

  // Initialize our service with any options it requires
  app.use('/send_email', sendEmail);

  // Get our initialized service so that we can register hooks
  //const service = app.service('mailer');

  //service.hooks(hooks);
};
