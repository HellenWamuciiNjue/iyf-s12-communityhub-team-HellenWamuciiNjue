
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },

    neighborhood: {
      type: String,
      trim: true
    },

    estate: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      default: 'member'
    },

    skills: {
      type: [String],
      default: []
    },

    services: {
      type: [String],
      default: []
    },

    contactInfo: {
      phone: {
        type: String,
        trim: true
      },
      alternateContact: {
        type: String,
        trim: true
      }
    }
  },
  {
    timestamps: true
  }
);

// Hash the password before saving a user.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);
