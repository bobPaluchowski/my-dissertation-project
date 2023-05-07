import mongoose from 'mongoose'

// const holidaySchema = mongoose.Schema(
//   {
//     dates: [{ type: String, required: true }],
//     requestdate: { type: String, required: false },
    
//   },
//   {
//     timestamps: true,
//   }
// )
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    
   
    location: {
      type: String,
      // enum: ["home", "office"],
      default: "office",
    },
    site: {
      type: String,
      // enum: ["main_site", "field_office"],
      default: "main_site",
    },
    holiday_entitlement: {
      type : String,
      default: '0'
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    // holidays: [holidaySchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema)

export default User