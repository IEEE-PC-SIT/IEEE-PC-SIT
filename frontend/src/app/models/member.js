// models/member.js
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  photo: { type: String },
  linkedin: { type: String },
  github: { type: String },
  post: { type: String },
  password: { type: String, required: true },
});

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

export default Member;
