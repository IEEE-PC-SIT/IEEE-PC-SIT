// src/app/api/feedback/submit/route.js
import dbConnect from '../../../services/dbConnect';
import Feedback from '../../../models/feedback';

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const { feedback, submittedBy } = await req.json(); // Use req.json() in Next.js 13+ for body parsing

    if (!feedback || !submittedBy) {
      return res.status(400).json({ message: 'Feedback and user identity are required' });
    }

    const newFeedback = new Feedback({ feedback, submittedBy });
    await newFeedback.save();

    return res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};
