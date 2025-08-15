const { AccessControl } = require('accesscontrol');
const ac = new AccessControl();

ac.grant('user')
  .readOwn('server')
  .updateOwn('server')
  .deleteOwn('server');

ac.grant('admin')
  .extend('user')
  .readAny('server')
  .updateAny('server');

ac.grant('owner')
  .extend('admin')
  .createAny('user')
  .deleteAny('user')
  .readAny('user')
  .readAny('system');

module.exports = ac;
