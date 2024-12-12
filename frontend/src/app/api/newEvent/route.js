import dbConnect from '../../services/dbConnect';
import NewEvent from '../../models/newEvent';

dbConnect();

export async function GET() {
  try {
    const events = await NewEvent.find().sort({ date: 1 });
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error retrieving events', error: error.message }),
      { status: 500 }
    );
  }
}
