// app/api/members/mydetails/[id]/route.js
import dbConnect from '../../../../services/dbConnect';
import Member from '../../../../models/member';

export async function GET(req, { params }) {
  const { id } = await params; // Extract the member ID from URL params

  try {
    await dbConnect(); // Connect to the database

    // Find the member by _id and exclude the password field
    const member = await Member.findById(id).select('-password');

    // If the member is not found
    if (!member) {
      return new Response(
        JSON.stringify({ message: 'Member not found' }),
        { status: 404 }
      );
    }

    // Return the member details
    return new Response(JSON.stringify(member), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: 'Error fetching member details', error: err.message }),
      { status: 500 }
    );
  }
}
