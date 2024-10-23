/**
 * @author: Fras 
 * @description : this file contain the model of User
 */


import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: true,
      select: false,
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPasswrod) {
  return await bcrypt.compare(enteredPasswrod, this.password)
}


// Hash Password if the password is modified (new user or update password)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// To know the time when the password is modified
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// To give only active users
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema)

export default User;