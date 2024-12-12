import { NextResponse } from 'next/server';
import  dbConnect  from '../../../../services/dbConnect'; // Adjust the import path to your database connection
import Member from '../../../../models/member'; // Adjust the import path to your Member model
import { v2 as cloudinary } from 'cloudinary'; // Cloudinary configuration

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function PUT(request, { params }) {
  await dbConnect(); // Ensure database connection

  try {
    const { id } = await params;
    const formData = await request.formData();

    // Find the member
    const member = await Member.findById(id);
    
    if (!member) {
      return NextResponse.json(
        { message: "Member not found" }, 
        { status: 404 }
      );
    }

    // Handle photo upload
    const photoFile = formData.get('photo');
    if (photoFile && photoFile instanceof File) {
      // Convert File to buffer
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      if (member.photo) {
        // Delete existing photo from Cloudinary
        await cloudinary.uploader.destroy(
          extractPublicIdFromUrl(member.photo)
        );
      }

      // Upload new photo
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto' }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      member.photo = uploadResult.secure_url;
    }
    // Update other member fields
    member.name = formData.get('name') || member.name;
    member.usn = formData.get('usn') || member.usn;
    member.year = formData.get('year') 
      ? Number(formData.get('year')) 
      : member.year;
    member.linkedin = formData.get('linkedin') || member.linkedin;
    member.github = formData.get('github') || member.github;
    member.post = formData.get('post') || member.post;

    // Save updated member
    await member.save();

    return NextResponse.json(
      { message: "Member Details updated successfully!" }, 
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating member", error: err.message }, 
      { status: 500 }
    );
  }
}

// Utility function to extract public ID from Cloudinary URL
function extractPublicIdFromUrl(url) {
  // Extract the public ID from a Cloudinary URL
  const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
  return matches ? matches[1] : null;
}