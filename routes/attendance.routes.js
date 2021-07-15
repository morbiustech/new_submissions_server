module.exports = app => {
    const Attendance = require("../controllers/attendance.controller");
  
    var router = require("express").Router();
    
      // Create attendance details
      router.post("/attendance/add", Attendance.create);


      router.post("/attendance/count", Attendance.countAttendanceData);
   

  
    app.use('/api/submissions', router);
  };