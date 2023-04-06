const jwt = require('jsonwebtoken');





module.exports.checkUser = (req, res, next) => {
  const token = req.headers.authorization;

  try {

    if (token) {
      const decode = jwt.decode(token, 'tokenGenerate');
      if (decode) {
        req.userId = decode.id;
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: 'You are not authorised'
        });
      }

    } else {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorised'
      });
    }

  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'You are not authorised'
    });
  }

}




module.exports.checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  try {

    if (token) {
      const decode = jwt.decode(token, 'tokenGenerate');
      if (decode && decode.isAdmin) {
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: 'You are not authorised'
        });
      }

    } else {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorised'
      });
    }

  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'You are not authorised'
    });
  }

}