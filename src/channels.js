module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection) => {
    // eslint-disable-next-line no-console
    console.log('connection :D');

    app.channel('anonymous').join(connection);
  });


  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  app.service('messengers').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('messenger patched');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('update_messenger_status').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('update_messenger_status patched');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('update_task_state').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('task state patched');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('locations').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('location patched');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('deliveries').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('delivery patched');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('deliveries').publish('removed', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('delivery removed');
    return app.channel('anonymous');
  });

  // eslint-disable-next-line no-unused-vars
  app.service('tasks').publish('patched', (data, hook) => {
    // eslint-disable-next-line no-console
    console.log('task patched');
    return app.channel('anonymous');
  });

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
