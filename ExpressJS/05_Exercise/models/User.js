const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);
<<<<<<< HEAD
// TODO: Create an admin at initialization here
=======

User.seedAdminUser = async () => {
  try{
    let users = await User.find();
    if(users.length >0){
      return;
    }

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt,'Admin');
    return User.create({
      username: 'Admin',
      salt,
      hashedPass,
      roles: ['Admin'],
    })
  } catch (e) {
    console.log(e)
  }
}

>>>>>>> a530bef6a0f1863842e254556e0c8259ea06166f
module.exports = User;
