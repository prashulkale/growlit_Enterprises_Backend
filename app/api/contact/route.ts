// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { z } from 'zod';

// // Define the schema for validation
// const contactSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   company: z.string().optional(),
//   phone: z.string().optional(),
//   inquiryType: z.enum(['GENERAL', 'PRODUCT', 'SUPPORT', 'PARTNER'], {
//     errorMap: () => ({ message: 'Invalid inquiry type' }),
//   }),
//   message: z.string().min(10, 'Message must be at least 10 characters'),
// });

// // Enable CORS
// export async function OPTIONS() {
//   return new Response(null, {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = contactSchema.parse(body);

//     const contact = await prisma.contact.create({
//       data: validatedData,
//     });

//     return NextResponse.json(
//       { message: 'Contact saved successfully', contact },
//       {
//         status: 201,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'POST, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type',
//         },
//       }
//     );
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: 'Invalid input', details: error.errors },
//         { status: 400 }
//       );
//     }
//     console.error('Error saving contact:', error);
//     return NextResponse.json(
//       { error: 'Failed to save contact' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Define the schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  inquiryType: z.enum(['GENERAL', 'PRODUCT', 'SUPPORT', 'PARTNER'], {
    errorMap: () => ({ message: 'Invalid inquiry type' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

console.log(process.env.SMTP_EMAIL)
// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});


export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Save to database
    const contact = await prisma.contact.create({
      data: validatedData,
    });

    // Email content for user
    // const userMailOptions = {
    //   from: process.env.SMTP_EMAIL,
    //   to: validatedData.email,
    //   subject: 'Thank you for contacting us',
    //   html: `
    //     <h2>Dear ${validatedData.name},</h2>
    //     <p>Thank you for reaching out to us. We have received your inquiry and our team will get back to you shortly.</p>
    //     <p><strong>Your inquiry details:</strong></p>
    //     <ul>
    //       <li><strong>Type:</strong> ${validatedData.inquiryType}</li>
    //       ${validatedData.company ? `<li><strong>Company:</strong> ${validatedData.company}</li>` : ''}
    //       ${validatedData.phone ? `<li><strong>Phone:</strong> ${validatedData.phone}</li>` : ''}
    //       <li><strong>Message:</strong> ${validatedData.message}</li>
    //     </ul>
    //     <p>Best regards,<br/>Growlit Enterprises Team</p>
    //   `,
    // };


    const userMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: validatedData.email,
      subject: 'Thank you for contacting Growlit Enterprises',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4f46e5; padding: 30px 0; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
            .details { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .footer { margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center; }
            .button { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
            ul { padding-left: 20px; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Growlit Enterprises</h1>
          </div>
          <div class="content">
            <h2 style="color: #111827;">Dear ${validatedData.name},</h2>
            <p>Thank you for contacting Growlit Enterprises! We've received your inquiry and our team will review it shortly.</p>
            
            <div class="details">
              <h3 style="margin-top: 0; color: #4f46e5;">Your Inquiry Details</h3>
              <ul>
                <li><strong>Type:</strong> ${validatedData.inquiryType}</li>
                ${validatedData.company ? `<li><strong>Company:</strong> ${validatedData.company}</li>` : ''}
                ${validatedData.phone ? `<li><strong>Phone:</strong> ${validatedData.phone}</li>` : ''}
                <li><strong>Message:</strong><br>${validatedData.message}</li>
              </ul>
            </div>
            
            <p>We typically respond within 24-48 hours. If you need immediate assistance, please call our support line at <strong>+1 (800) 123-4567</strong>.</p>
            
            <div class="footer">
              <p>Best regards,<br>The Growlit Enterprises Team</p>
              <p style="margin-top: 20px;">
                <a href="https://growlitenterprises.com" style="color: #4f46e5;">Visit our website</a> | 
                <a href="mailto:support@growlit.com" style="color: #4f46e5;">Email support</a>
              </p>
              <p style="font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Growlit Enterprises. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    // Email content for admin
    // const adminMailOptions = {
    //   from: process.env.SMTP_EMAIL,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Form Submission - ${validatedData.inquiryType}`,
    //   html: `
    //     <h2>New contact form submission</h2>
    //     <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
    //     <p><strong>Inquiry Type:</strong> ${validatedData.inquiryType}</p>
    //     ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
    //     ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${validatedData.message}</p>
    //     <p><a href="${process.env.ADMIN_DASHBOARD_URL}/queries">View in dashboard</a></p>
    //   `,
    // };

    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Submission: ${validatedData.inquiryType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4f46e5; padding: 30px 0; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
            .alert { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .footer { margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center; }
            .button { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
            .label { color: #6b7280; font-size: 14px; }
            .value { font-weight: 500; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header" style="background:#4b5563">
            <h1>New Contact Submission</h1>
          </div>
          <div class="content">
            <div class="alert">
              <strong>Action Required:</strong> A new contact form submission requires your attention.
            </div>
            
            <div class="details">
              <h3 style="margin-top: 0; color: #4f46e5;">Submission Details</h3>
              
              <div class="label">From</div>
              <div class="value">${validatedData.name} &lt;${validatedData.email}&gt;</div>
              
              <div class="label">Inquiry Type</div>
              <div class="value" style="color: #4f46e5; font-weight: 600;">${validatedData.inquiryType}</div>
              
              ${validatedData.company ? `
              <div class="label">Company</div>
              <div class="value">${validatedData.company}</div>
              ` : ''}
              
              ${validatedData.phone ? `
              <div class="label">Phone</div>
              <div class="value">${validatedData.phone}</div>
              ` : ''}
              
              <div class="label">Message</div>
              <div class="value" style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                ${validatedData.message}
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <a href="${process.env.ADMIN_DASHBOARD_URL}/queries" class="button" style="color: #fff;">
                  View in Dashboard
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was generated automatically by the Growlit Enterprises contact system.</p>
              <p style="font-size: 12px; color: #9ca3af;">Submission received: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
          return console.error("Error sending email:", error);
        }
        console.log("Email sent:", info.response);
      }),
      transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
          return console.error("Error sending email:", error);
        }
        console.log("Email sent:", info.response);
      }),
    ]);

    return NextResponse.json(
      { message: 'Contact saved successfully', contact },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error processing contact:', error);
    return NextResponse.json(
      { error: 'Failed to process contact' },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {

    
    const contacts = await prisma.contact.findMany({
      
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(contacts , {  headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },});
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500, headers: {
        'Access-Control-Allow-Origin': '*',
      } }
    );
  }
}