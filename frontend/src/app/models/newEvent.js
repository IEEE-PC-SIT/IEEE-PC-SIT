import mongoose from 'mongoose';

const newEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  registerLink: { type: String, required: true },
  lastDate: { type: Date, required: true },
});

export default mongoose.models.NewEvent || mongoose.model('NewEvent', newEventSchema);
