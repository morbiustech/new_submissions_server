const dbConfig = require('../config/db.config')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url

db.user = require("./user.model");
db.role = require("./role.model");
db.batches = require("./batches.model")
db.students = require("./students.model")
db.assignments = require("./assignments.model")
db.fees = require("./fees.model")
db.attendance = require("./attendance.model")
db.courses = require("./courses.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;