const path = require('path');





const file_check = (req, res, next) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing Files'
    });
  }
  const extensions = ['.png', '.jpg', '.jpeg'];
  const file = req.files.image;
  const fileName = path.extname(file.name);
  if (!extensions.includes(fileName)) {
    return res.status(400).json({
      status: 'error',
      message: 'please provide valid image file'
    });
  }

  file.mv(`./uploads/images/${file.name}`, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: 'something went wrong'
      });
    }
  })

  next();

}


module.exports = file_check;