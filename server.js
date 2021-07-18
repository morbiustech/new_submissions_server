const express = require('express')
const cors = require('cors')
const app = express()

var corOptions  = {
    origin:true
}

app.use(cors(corOptions))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db = require('./models')
const Role = db.role

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database!")
  }).catch(err => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });

}
initial()

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/batches.routes')(app);
require('./routes/students.routes')(app);
require('./routes/assignments.routes')(app);
require('./routes/fees.routes')(app);
require('./routes/attendance.routes')(app);
require('./routes/courses.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to todo mongo server 1.0" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  