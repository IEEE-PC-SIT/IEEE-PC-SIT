// app/api/members/login/route.js
import bcrypt from 'bcryptjs';
import dbConnect from '../../../services/dbConnect';
import Member from '../../../models/member';

export async function POST(req) {
  const { usn, password } = await req.json(); // Extract USN and password from request body

  try {
    await dbConnect(); // Connect to the database

    // Find member by usn
    const member = await Member.findOne({ usn });

    // If member not found
    if (!member) {
      return new Response(
        JSON.stringify({ message: 'Member does not exist' }),
        { status: 400 }
      );
    }

    // Compare the provided password with the hashed password stored in DB
    const isPasswordCorrect = await bcrypt.compare(password, member.password);

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: 'Invalid password' }),
        { status: 400 }
      );
    }

    // If login is successful, return the member's ID
    return new Response(
      JSON.stringify({ memberId: member._id }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500 }
    );
  }
}
