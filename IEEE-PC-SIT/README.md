# IEEE-PC-SIT
ieeepcsittech  aWG0dZBfh0oorL89   mongodb
mongodb+srv://ieeepcsittech:<db_password>@cluster0.p7ymz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




Cloud name=dfvwqyqzc
API key=689291479619529
API secret=bbYe8D5uHaF4Kn-0F1_VSie3Hkw

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dfvwqyqzc', 
        api_key: '689291479619529', 
        api_secret: 'bbYe8D5uHaF4Kn-0F1_VSie3Hkw' 
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();