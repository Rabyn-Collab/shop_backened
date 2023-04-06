const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.query);
  try {
    const isExistUser = await User.findOne({ email: email });

    if (isExistUser) {
      const isValidPassword = await bcrypt.compareSync(password, isExistUser.password);

      if (isValidPassword) {
        const token = jwt.sign({ id: isExistUser._id, isAdmin: isExistUser.isAdmin }, 'tokenGenerate');
        return res.status(200).json({
          status: 'success',
          data: {
            id: isExistUser._id,
            fullname: isExistUser.fullname,
            email: isExistUser.email,
            isAdmin: isExistUser.isAdmin,
            token
          }
        });
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'invalid credential'
        });
      }


    } else {
      return res.status(400).json({
        status: 'error',
        message: 'user not found'
      })
    }

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    })
  }
}





module.exports.userSignUp = async (req, res) => {
  const { email, fullname, password } = req.body;

  try {
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      return res.status(422).json({
        status: 'error',
        message: 'user already exist'
      });
    }
    const hashedPassword = await bcrypt.hash(password ?? '123456', 12);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: 'success',
      message: 'user successfully registered'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      message: err
    })
  }

}