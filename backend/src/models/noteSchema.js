import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title of note is required."],
  },
  description: {
    type: String,
    required: [true, "Description of note is required."],
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

noteSchema.pre("findOneAndUpdate", function (next) {
  console.log("updated many", this.obj);
  this.updatedAt = Date.now();

  next();
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
