import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// let port = null;
// if(process.env.PORT){
//     port = process.env.PORT;
// }else{
//     port = 3000;
// }

let users = [];
/////generate random number from 1to 10000000000

function randomNumber() {
  return Math.floor(Math.random() * 10000000000);
}

app.post("/user", (req, res) => {

  console.log(req.body);//https://expressjs.com/en/4x/api.html#req.body

  let newUser = {
    id: randomNumber(),
    fullName: req.body.fullName,
    userName: req.body.userName,
    passward: req.body.passward,
  }

  users.push(newUser);

  res.status(201).send("user is created");

})

app.get("/user/:userId", (req, res) => {//get single user

  console.log(req.params.userId);
  console.log(users);
  console.log("Maria is very beautiful");




  let userId = req.params.userId;
  let isFound = false;

  for (let i = 0; i < users.length; i++) {
    console.log("Maria is very pretty", i);
    if (users[i].id == userId) {

      console.log("inside");

      res.send(users[i]);
      isFound = true;
      break;
    }
  }
   console.log(isFound);

  if (!isFound) {
    res.status(204);
    res.send("user not found");

  }
})

app.get('/users', (req, res) => { //get all users
  res.send(users)
})

app.put("/user/:userId", (req, res) => {
  res.send("your user is modified");

  let userId = (" req.params.userId");
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      userIndex = i;
      break;
    }
  }
  if (userIndex === -1) {
    res.status(204).send("user not found");
  } else {
    if (req.body.fullName) { users[userIndex].fullName = req.body.fullName };

    if (req.body.userName) { users[userIndex].userName = req.body.userName };

    if (req.body.passward) {
      users[userIndex].passward = req.body.passward
    };
    res.send(users[userIndex]);
  }
}
)

app.delete("/user/:userId", (req, res) => {

  let userId = (" req.params.userId");
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      userIndex = i;
      break;
    }
  }
  if (userIndex === -1) {
    res.status(204).send("user not found");
  } else {
    users.splice(userIndex, 1);
    res.send("user is deleted");
  }
})
app.delete("/users", (req, res) => {
  users = [];
  res.send("All users are deleted");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}Maria is beautiful`)
})