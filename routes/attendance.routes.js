module.exports = app => {
    const Attendance = require("../controllers/attendance.controller");
  
    var router = require("express").Router();
    
      // Create attendance details
      router.post("/attendance/add", Attendance.create);

       // Get Student Wise Attendance
       router.post("/attendance/single/find",Attendance.findOne)

       // Get Student Wise Attendance
       router.post("/attendance/single/find",Attendance.findOne)

      // Get All Attendance
      router.get("/attendance/find/all",Attendance.findAll)

      // Count Attendance data
      router.post("/attendance/count", Attendance.countAttendanceData);

      // Send Attendance Email
      router.post("/attendance/email",Attendance.sendAttendanceEmail)
   

      // Delete single attendance data
      router.delete("/attendance/single/remove/:id",Attendance.deleteOne)
      // Delete All Attendance Data
      router.delete("/attendance/remove/all",Attendance.deleteAll)
  
    app.use('/api/submissions', router);
  };