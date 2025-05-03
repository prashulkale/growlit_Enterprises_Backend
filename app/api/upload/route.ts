// import { NextRequest, NextResponse } from 'next/server';
// import { uploadImage } from '@/lib/utils/cloudinary';



// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File;
    
//     if (!file) {
//       return NextResponse.json(
//         { error: 'No file provided' },
//         { status: 400 }
//       );
//     }
    
//     const imageUrl = await uploadImage(file);
    
//     return NextResponse.json({ url: imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     return NextResponse.json(
//       { error: 'Failed to upload image' },
//       { status: 500 }
//     );
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };










import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Opt out of static behavior
export const fetchCache = 'force-no-store'; // Don't cache

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Your file processing logic here
    // Example: Upload to Cloudinary or save to filesystem

    return NextResponse.json(
      { success: true, message: 'File uploaded successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}