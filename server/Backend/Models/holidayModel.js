import mongoose from "mongoose";

const holidaySchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    
    dates: [{ type: Array, required: true }],
    totalDays: {
      type: Number,
      default: 1,
        
      },
    isApproved: {
      type: Boolean,
      default: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
