const mongoose = require('mongoose');
const { db_user, db_password } = require('./config');
// Live database
var mongoString = "mongodb://" + db_user + ":" + db_password + "your path to remote mongoDB";


// local database
mongoString = 'mongodb://localhost/my_users_db';

mongoose.connect(mongoString, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;