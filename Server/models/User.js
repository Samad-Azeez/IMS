import mongoose from 'mongoose';
import bcrybt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    department: {
      type: String,

      // The enum option restricts the values of this field to specific allowed values
      enum: {
        // The array of valid company names
        values: [
          'ict department',
          'public affairs department',
          'human resource department',
        ],
        // Custom error message when a value outside the enum is provided
        message: '{VALUE} is not supported',
      },

      required: [true, 'Please chose a department'],
    },
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware to hash the user's password with bcrypt before saving it to the database
userSchema.pre('save', async function () {
  const salt = await bcrybt.genSalt(10);
  this.password = await bcrybt.hash(this.password, salt);
});

// Method to generate a JSON Web Token (JWT) for ever user schema instance
userSchema.methods.createJWT = function () {
  return jsonwebtoken.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET, // secret key
    {
      expiresIn: process.env.JWT_LIFETIME, // token lifetime
    }
  );
};

// Method to compare the user's password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrybt.compare(password, this.password);
  return isMatch;
};

export const User = mongoose.model('User', userSchema);
