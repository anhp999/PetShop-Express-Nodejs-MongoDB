const multer = require('multer')

//set storage
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
        //pass the null if there is something wrong while uploading images.
    },
    //add back the extension
    filename: function(req, file, callback){
        //image.jpg (ext wil return the .jpg)
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
                
        callback(null, file.fieldname + '_' + Date.now() + ext)
    }
})
/* const fileFilter = (req, file, callback) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
  };
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); */

module.exports = store = multer({storage:storage }) //inform the const = multer