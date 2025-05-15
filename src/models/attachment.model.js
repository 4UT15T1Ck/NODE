import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: { 
        type: String 
    },
    path: { 
        type: String 
    },
    cloudinaryId: { 
        type: String 
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
});

export default mongoose.model("File", fileSchema);

