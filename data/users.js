const bcrypt = require('bcrypt');


const user = [

  {
    fullname: 'AtAdmin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    fullname: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  }


];