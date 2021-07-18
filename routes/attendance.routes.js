module.exports = app => {
    const Attendance = require("../controllers/attendance.controller");
  
    var router = require("express").Router();
    
      // Create attendance details
      router.post("/attendance/add", Attendance.create);

      // Get All Attendance
      router.get("/attendance/find/all",Attendance.findAll)

      // Count Attendance data
      router.post("/attendance/count", Attendance.countAttendanceData);
   
      // Delete All Attendance Data
      router.delete("/attendance/remove/all",Attendance.deleteAll)
  
    app.use('/api/submissions', router);
  };