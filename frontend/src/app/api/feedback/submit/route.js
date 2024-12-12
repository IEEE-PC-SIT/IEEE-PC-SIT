import dbConnect from '../../../services/dbConnect';
import Feedback from '../../../models/feedback';

export const POST = async (req) => {
  await dbConnect();

  try {
    const { feedback, submittedBy } = await req.json(); 

    if (!feedback || !submittedBy) {
      return new Response(
        JSON.stringify({ message: 'Feedback and user identity are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newFeedback = new Feedback({ feedback, submittedBy });
    await newFeedback.save();

    return new Response(
      JSON.stringify({ message: 'Feedback submitted successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Error submitting feedback', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
