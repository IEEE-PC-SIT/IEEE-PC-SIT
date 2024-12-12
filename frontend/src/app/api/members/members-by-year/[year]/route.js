import dbConnect from '../../../../services/dbConnect'; // Adjust the path to your dbConnect utility
import Member from '../../../../models/member';

export async function GET(req, { params }) {
  const { year } = params; // Get the year from the URL parameters

  try {
    await dbConnect(); // Connect to the database
    const members = await Member.find({ year: parseInt(year) }); // Query members by the year

    if (members.length === 0) {
      return new Response(
        JSON.stringify({ message: `No members found for year ${year}` }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(members), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Error retrieving members' }),
      { status: 500 }
    );
  }
}