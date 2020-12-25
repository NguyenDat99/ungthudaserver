// set up ========================
const express  = require('express');
var app      = express();                              // create our app w/ express
const admin = require("firebase-admin");
const morgan = require('morgan');
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});
//cloud
const serviceAccount = require("./redimed-9a201-firebase-adminsdk-wsv26-99517fcf0d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://redimed-9a201.firebaseio.com"
});
var db = admin.database();
var patientRef = db.ref("Patient");
var doctorRef = db.ref("Doctor");
var adminRef = db.ref("Admin");
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', function (req, res) {
  res.send("hello")
})


class Account {
  constructor(key,name,birth,email,pass,phone) {
    this.key = key
    this.name = name;
    this.birth  = birth
    this.email  = email
    this.pass =  pass
    this.phone  = phone
  }
}


// get Patients --->ok
app.post('/api/getPatients', function(req, res) {
  var accounts = []
  patientRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        var key,name,birth,email,pass,phone = ""
        if (item.key != undefined)
        key = item.key// key
        try {
          if (item.Profile.Name !== undefined)
          name = item.Profile.Name;
        }
        catch(err) {
          name = ""
        }
        try {
          if (item.Profile.Birth != undefined)
          birth  = item.Profile.Birth;
        }
        catch(err) {
          birth = ""
        }
        try {
          if (item.Profile.Email != undefined)
          email  = item.Profile.Email;
        }
        catch(err) {
          email = ""
        }
        try {
          if  (item.Profile.Pass != undefined)
          pass =  item.Profile.Pass;
        }
        catch(err) {
          pass = ""
        }
        try {
          if (item.Profile.Phone != undefined)
          phone  = item.Profile.Phone;
        }
        catch(err) {
          phone = ""
        }
        account = new Account(key,name,birth,email,pass,phone)
        accounts.push(account)
      })
       res.json({"message":"successfully fetch data", "result": true, "data": accounts});
      // res.json({"message":"successfully fetch data", "result": true, "data": snapshot.val()})
    }
  });
});

//get Doctors --->ok
app.post('/api/getDoctors', function(req, res) {
  var accounts = []
  doctorRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        var key,name,birth,email,pass,phone = ""
        if (item.key != undefined)
        key = item.key// key
        try {
          if (item.Profile.Name !== undefined)
          name = item.Profile.Name;
        }
        catch(err) {
          name = ""
        }
        try {
          if (item.Profile.Birth != undefined)
          birth  = item.Profile.Birth;
        }
        catch(err) {
          birth = ""
        }
        try {
          if (item.Profile.Email != undefined)
          email  = item.Profile.Email;
        }
        catch(err) {
          email = ""
        }
        try {
          if  (item.Profile.Pass != undefined)
          pass =  item.Profile.Pass;
        }
        catch(err) {
          pass = ""
        }
        try {
          if (item.Profile.Phone != undefined)
          phone  = item.Profile.Phone;
        }
        catch(err) {
          phone = ""
        }
        account = new Account(key,name,birth,email,pass,phone)
        accounts.push(account)
      })
      res.json({"message":"successfully fetch data", "result": true, "data": accounts});
    }
  });
});


//get Admins --->ok
app.post('/api/getAdmins', function(req, res) {
  var accounts = []
  adminRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        var key,name,birth,email,pass,phone = ""
        if (item.key != undefined)
        key = item.key// key
        try {
          if (item.Profile.Name !== undefined)
          name = item.Profile.Name;
        }
        catch(err) {
          name = ""
        }
        try {
          if (item.Profile.Birth != undefined)
          birth  = item.Profile.Birth;
        }
        catch(err) {
          birth = ""
        }
        try {
          if (item.Profile.Email != undefined)
          email  = item.Profile.Email;
        }
        catch(err) {
          email = ""
        }
        try {
          if  (item.Profile.Pass != undefined)
          pass =  item.Profile.Pass;
        }
        catch(err) {
          pass = ""
        }
        try {
          if (item.Profile.Phone != undefined)
          phone  = item.Profile.Phone;
        }
        catch(err) {
          phone = ""
        }
        account = new Account(key,name,birth,email,pass,phone)
        accounts.push(account)
      })
      res.json({"message":"successfully fetch data", "result": true, "data": accounts});
    }
  });
});



//  login Doctor
app.post('/api/login', function(req, res) {
var data = req.body;
var flag = 0;
var count = 0;
adminRef.once("value", function(snapshot) {
  if (snapshot.val() == null) {
    res.json({message: "Error: No user found", "result": false});
  } else {
    snapshot.forEach(function(childSnapshot) {
      let item = childSnapshot.val(); // value
      item.key = childSnapshot.key;// key
      count += 1
      try {
        if (item.Profile.Email != undefined && item.Profile.Email == data.Profile.Email &&
          item.Profile.Pass != undefined && item.Profile.Pass == data.Profile.Pass)
        {
          flag = 1;
          return res.json(item);
        }
        }
          catch(err) {}
          if(flag == 0 && count == snapshot.numChildren())
          {  try {
            res.json({message: "error", result: false});
          } catch (e) {}
        }
      })
    }
  })
});


// create Admin --->ok
app.post('/api/createAdmin', function(req, res) {
  const data = req.body;
    var email = data.Profile.Email;
  var countIndex = 0
  adminRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      var erEmail = ""
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        countIndex += 1
        try {
          if (item.Profile.Email != undefined && item.Profile.Email == email )
          erEmail = 1;
        }
        catch(err) {}
      })
      if(erEmail == 1)
      try {
        res.json({message: "email error", result: false});
      } catch (e) {
      }
      if(countIndex == (snapshot.numChildren())&& erEmail!=1)
      {
        var dataKey = email.substring(0,email.indexOf("@"))
        adminRef.child(dataKey).set(data, function(err){
            if (err) {
              try {
                res.send(err)
              } catch (e) {}
            } else {
              // var key = Object.keys(snapshot.val())[0];
              // console.log(key);
              try {
                res.json({message: "Success: User Save.", result: true});
              } catch (e) {}
            }
        })
      }
    }
  })
});



// create Doctor --->ok
app.post('/api/createDoctor', function(req, res) {
  const data = req.body;
    var phone = data.Profile.Phone;
  var countIndex = 0
  doctorRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      var erPhone = ""
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        countIndex += 1
        try {
          if (item.Profile.Phone != undefined && item.Profile.Phone == phone )
          erPhone =1;
        }
        catch(err) {}
      })
      if(erPhone == 1)
      try {
        res.json({message: "Phone error", result: false});
      } catch (e) {
      }
      if(countIndex == (snapshot.numChildren())&& erPhone!=1)
      {
        // var dataKey = email.substring(0,email.indexOf("@"))
        doctorRef.child(data.Profile.Phone).set(data, function(err){
            if (err) {
              try {
                res.send(err)
              } catch (e) {}
            } else {
              // var key = Object.keys(snapshot.val())[0];
              // console.log(key);
              try {
                res.json({message: "Success: User Save.", result: true});
              } catch (e) {}
            }
        })
      }
    }
  })
});

// create Patient --->ok
app.post('/api/createPatient', function(req, res) {
  const data = req.body;
  var phone = data.Profile.Phone;
  var countIndex = 0
  patientRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      var erPhone = ""
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        countIndex += 1
        item.key = childSnapshot.key;// key
        try {
          if (item.Profile.Phone != undefined && item.Profile.Phone == phone )
          erPhone = 1;
        }
        catch(err) {}
      })
      if(erPhone == 1)
      try {
        res.json({message: "Phone error", result: false});
      } catch (e) {}
      if(countIndex == (snapshot.numChildren())&& erPhone!=1)
      {
        // var dataKey = email.substring(0,email.indexOf("@"))
        patientRef.child(data.Profile.Phone).set(data, function(err){
            if (err) {
              try {
                res.send(err)
              } catch (e) {}
            } else {
              // var key = Object.keys(snapshot.val())[0];
              // console.log(key);
              try {
                res.json({message: "Success: User Save.", result: true});
              } catch (e) {}
            }
        })
//
      }
    }
  })
});

// update Patient --->ok
app.put('/api/updatePatient', function(req, res) {
  var data = req.body;
  var flag = 0;
  var count = 0;
  patientRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        count += 1
        try {
          if(item.key ==  data.Profile.key)
          // if (item.Profile.Email != undefined && item.Profile.Email == data.Profile.Email )
          {
            flag = 1;
            var newData = item;
            if(data.Profile.Name != undefined)
              newData.Profile.Name = data.Profile.Name;
            if(data.Profile.Email != undefined)
              newData.Profile.Email = data.Profile.Email;
            if(data.Profile.Birth != undefined)
              newData.Profile.Birth = data.Profile.Birth;
            if(data.Profile.Pass != undefined)
              newData.Profile.Pass = data.Profile.Pass;
            if(data.Profile.Phone != undefined)
              newData.Profile.Phone = data.Profile.Phone;
              //
              if(item.key != data.Profile.Phone)
              {
              //tao item moi
              patientRef.child(data.Profile.Phone).set(data, function(err){
                  if (err) {
                    try {
                      res.send(err)
                    } catch (e) {}
                  } else {
                    // var key = Object.keys(snapshot.val())[0];
                    // console.log(key);
                    try {
                      res.json({message: "Success: User Save.", result: true});
                    } catch (e) {}
                  }
              })
              //xoa item cu
              patientRef.child(item.key).remove(function(err) {
                  if (err) {
                    res.send(err);
                  } else {
                    try {
                      res.json({message: "Success: User deleted.", result: true});
                    } catch (e) {}
                  }
                })
              }
              else {
              patientRef.child(item.key).update(newData, function(err) {
                if (err) {
                  try {
                    res.send(err);
                  } catch (e) {

                  }

                } else {
                  patientRef.child(item.key).once("value", function(snapshot) {
                    if (snapshot.val() == null) {
                      try {
                        res.json({message: "Error: No user found", "result": false});
                      } catch (e) {}
                    } else {
                      try {
                        res.json({"message":"successfully update data", "result": true, "data": snapshot.val()});
                      } catch (e) {}
                    }
                  });
                }
              });
              }
//
          }}
            catch(err) {}
            if(flag == 0 && count == snapshot.numChildren())
            {  try {
              res.json({message: "error", result: false});
            } catch (e) {}
          }
        })
      }
    })
});


// update Doctor --->ok
app.put('/api/updateDoctor', function(req, res) {
  var data = req.body;
  var flag = 0;
  var count = 0;
  doctorRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        count += 1
        try {
          if(data.Profile.key === item.key)
          // if (item.Profile.Email != undefined && item.Profile.Email == data.Profile.Email )
          {
            flag = 1;
            var newData = item;
            if(data.Profile.Name != undefined)
              newData.Profile.Name = data.Profile.Name;
            if(data.Profile.Email != undefined)
                newData.Profile.Email = data.Profile.Email;
            if(data.Profile.Birth != undefined)
              newData.Profile.Birth = data.Profile.Birth;
            if(data.Profile.Pass != undefined)
              newData.Profile.Pass = data.Profile.Pass;
            if(data.Profile.Phone != undefined)
              newData.Profile.Phone = data.Profile.Phone;

              if(item.key != data.Profile.Phone)
              {
                //tao item moi
                doctorRef.child(data.Profile.Phone).set(data, function(err){
                    if (err) {
                      try {
                        res.send(err)
                      } catch (e) {}
                    } else {
                      // var key = Object.keys(snapshot.val())[0];
                      // console.log(key);
                      try {
                        res.json({message: "Success: User Save.", result: true});
                      } catch (e) {}
                    }
                })
                //xoa item cu
                doctorRef.child(item.key).remove(function(err) {
                    if (err) {
                      res.send(err);
                    } else {
                      try {
                        res.json({message: "Success: User deleted.", result: true});
                      } catch (e) {}
                    }
                  })
              }
              else {
                doctorRef.child(item.key).update(newData, function(err) {
                  if (err) {
                    try {
                      res.send(err);
                    } catch (e) {

                    }

                  } else {
                    doctorRef.child(item.key).once("value", function(snapshot) {
                      if (snapshot.val() == null) {
                        try {
                          res.json({message: "Error: No user found", "result": false});
                        } catch (e) {}
                      } else {
                        try {
                          res.json({"message":"successfully update data", "result": true, "data": snapshot.val()});
                        } catch (e) {}
                      }
                    });
                  }
                });
              }
//
          }}
            catch(err) {}
            if(flag == 0 && count == snapshot.numChildren())
            {  try {
              res.json({message: "error", result: false});
            } catch (e) {}
          }
        })
      }
    })
});

// update admin --->ok
app.put('/api/updateAdmin', function(req, res) {
  var data = req.body;
  var flag = 0;
  var count = 0;
  adminRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        count += 1
        try {
          if(data.Profile.key === item.key)
          {
            flag = 1;
            var newData = item;
            if(data.Profile.Name != undefined)
              newData.Profile.Name = data.Profile.Name;
            if(data.Profile.Email != undefined)
                newData.Profile.Email = data.Profile.Email;
            if(data.Profile.Birth != undefined)
              newData.Profile.Birth = data.Profile.Birth;
            if(data.Profile.Pass != undefined)
              newData.Profile.Pass = data.Profile.Pass;
            if(data.Profile.Phone != undefined)
              newData.Profile.Phone = data.Profile.Phone;
              //
                adminRef.child(item.key).update(newData, function(err) {
                  if (err) {
                    try {
                      res.send(err);
                    } catch (e) {

                    }

                  } else {
                    adminRef.child(item.key).once("value", function(snapshot) {
                      if (snapshot.val() == null) {
                        try {
                          res.json({message: "Error: No user found", "result": false});
                        } catch (e) {}
                      } else {
                        try {
                          res.json({"message":"successfully update data", "result": true, "data": snapshot.val()});
                        } catch (e) {}
                      }
                    });
                  }
                });
//
          }}
            catch(err) {}
            if(flag == 0 && count == snapshot.numChildren())
            {  try {
              res.json({message: "error", result: false});
            } catch (e) {}
          }
        })
      }
    })
});

// delete Patient --->ok
app.delete('/api/removePatient', function(req, res) {
  var data = req.body;
  var flag = 0;
  var count = 0;
  patientRef.once("value", function(snapshot) {
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val(); // value
        item.key = childSnapshot.key;// key
        count += 1
        try {
          if (item.key == data.Profile.key )
          {
            flag = 1;
            patientRef.child(item.key).remove(function(err) {
              if (err) {
                res.send(err);
              } else {
                try {
                  res.json({message: "Success: User deleted.", result: true});
                } catch (e) {}
              }
            })
          }}
            catch(err) {}
            if(flag == 0 && count == snapshot.numChildren())
            {  try {
              res.json({message: "error", result: false});
            } catch (e) {}
          }
        })
      }
    })
  });
  // delete Doctor --->ok
  app.delete('/api/removeDoctor', function(req, res) {
    var data = req.body;
    var flag = 0;
    var count = 0;
    doctorRef.once("value", function(snapshot) {
      if (snapshot.val() == null) {
        res.json({message: "Error: No user found", "result": false});
      } else {
        snapshot.forEach(function(childSnapshot) {
          let item = childSnapshot.val(); // value
          item.key = childSnapshot.key;// key
          count += 1
          try {
            // if (item.Profile.Email != undefined && item.Profile.Email == email )
            if (item.key == data.Profile.key )
            {
              flag = 1;
              doctorRef.child(item.key).remove(function(err) {
                if (err) {
                  res.send(err);
                } else {
                  try {
                    res.json({message: "Success: User deleted.", result: true});
                  } catch (e) {}
                }
              })
            }}
              catch(err) {}
              if(flag == 0 && count == snapshot.numChildren())
              {  try {
                res.json({message: "error", result: false});
              } catch (e) {}
            }
          })
        }
      })
  });

  // delete Admin --->ok
  app.delete('/api/removeAdmin', function(req, res) {
    var data = req.body;
    var flag = 0;
    var count = 0;
    adminRef.once("value", function(snapshot) {
      if (snapshot.val() == null) {
        res.json({message: "Error: No user found", "result": false});
      } else {
        snapshot.forEach(function(childSnapshot) {
          let item = childSnapshot.val(); // value
          item.key = childSnapshot.key;// key
          count += 1
          try {
            if (item.key == data.Profile.key )
            {
              flag = 1;
              adminRef.child(item.key).remove(function(err) {
                if (err) {
                  res.send(err);
                } else {
                  try {
                    res.json({message: "Success: User deleted.", result: true});
                  } catch (e) {}
                }
              })
            }}
              catch(err) {}
              if(flag == 0 && count == snapshot.numChildren())
              {  try {
                res.json({message: "error", result: false});
              } catch (e) {}
            }
          })
        }
      })
  });



  app.listen(4000);
  console.log("localhost:4000");
