import mongoose from 'mongoose';

// Define the event schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photos: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true }, // Store Cloudinary public_id for deletion
    },
  ],
});

// Avoid overwriting the model during development
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
