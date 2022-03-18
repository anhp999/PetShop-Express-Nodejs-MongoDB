const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');


const UserNSchema = new Schema({
    email:{
        type: String,
        required:[true, "Please provide the email"],
        unique: true
    },
     password:{
         type: String,
         required:[true, "Please enter a password"],
         minlength:8,
         select:false
    },
    address: {
		type: String,
		required: false
	},
    phone: { 
        type: String,
        required:false,
    },
    role: {
		type: String,
		required: false,
		enum: ['visitor','admin']
	},
    deleteAt: { type: Date, default: Date.now},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
});

//Mongoose Middleware To Encrypt Password
//using async function because bcrypt returns promise so that we evaluate before proceeding further
/* UserNSchema.pre('save',async function(next){
    //check if the password is not modified
    if(!this.isModified('password')) {
        next();
    }
    //salt value to generate the encrypted hash
    const salt = await bcrypt.genSalt(10);
    //hash the current password with the salt
    this.password = await bcrypt.hash(this.password, salt);

})
UserNSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }; */
  
  UserNSchema.methods.encryptPassword = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
  };
  
  UserNSchema.methods.validPassword = function(password){
      return bcrypt.compareSync(password, this.password);
  }
UserNSchema.index({ email: 1})
module.exports = mongoose.model('usersn', UserNSchema);
