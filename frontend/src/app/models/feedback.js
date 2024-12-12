// models/feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  submittedBy: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;
