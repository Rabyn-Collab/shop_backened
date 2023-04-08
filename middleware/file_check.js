const path = require('path');
const fs = require('fs');




const file_check = (req, res, next) => {
  if (!req.files || !req.files.product_image) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing Files'
    });
  }
  const extensions = ['.png', '.jpg', '.jpeg'];
  const file = req.files.product_image;
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
  req.imagePath = `/uploads/images/${file.name}`;

  next();

}




const update_file_check = (req, res, next) => {

  if (!req.files) {
    next();
  }
  if (!req.files.product_image || !req.query.imagePath) {
    return res.status(400).json({
      status: 'error',
      message: 'provide valid image and imagePath'
    });
  }

  fs.unlink(`.${req.query.imagePath}`, (err) => {

  });


  const extensions = ['.png', '.jpg', '.jpeg'];
  const file = req.files.product_image;
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
  req.imagePath = `/uploads/images/${file.name}`;

  next();

}





module.exports = { file_check, update_file_check };
