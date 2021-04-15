const restful = require('node-restful');
import userSchema from '../schema/users';
  
var Users = restful.model(
    'users',userSchema
).methods(['get','post','put']);


export default Users;