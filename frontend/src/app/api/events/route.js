import dbConnect from '../../services/dbConnect'; // Adjust the path to your dbConnect utility
import Event from '../../models/events'; // Adjust the path to your Event model

dbConnect();

export async function GET(req) {
  try {
    // Fetch and sort events by date
    const events = await Event.find().sort({ date: 1 });

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error retrieving events', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
