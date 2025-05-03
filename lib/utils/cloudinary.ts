import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY , process.env.CLOUDINARY_API_SECRET )

export const uploadImage = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const base64 = buffer.toString('base64');
  const dataURI = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export default cloudinary;