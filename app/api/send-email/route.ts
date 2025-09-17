import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter using Zoho SMTP with multiple fallback options
    const smtpConfigs = [
      // Primary: Port 465 with SSL
      {
        host: process.env.EMAIL_HOST || 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      // Fallback: Port 587 with STARTTLS
      {
        host: process.env.EMAIL_HOST || 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      // Alternative: Zoho India
      {
        host: 'smtp.zoho.in',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    ];

    let transporter;
    let lastError;

    // Try each configuration until one works
    for (const config of smtpConfigs) {
      try {
        transporter = nodemailer.createTransport(config);
        await transporter.verify();
        console.log('SMTP connection verified with config:', config.host, config.port);
        break;
      } catch (error) {
        console.log('SMTP config failed:', config.host, config.port, error instanceof Error ? error.message : String(error));
        lastError = error;
        continue;
      }
    }

    if (!transporter) {
      throw new Error(`All SMTP configurations failed. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'pavan@thetejavath.com',
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #0a0a1a; color: #cccccc; padding: 20px; border: 2px solid #00ff00;">
          <h2 style="color: #00ff00; text-align: center; margin-bottom: 20px;">
            🚀 NEW PORTFOLIO CONTACT
          </h2>
          
          <div style="background-color: #1a1a2e; padding: 15px; border-left: 4px solid #00ffff; margin: 10px 0;">
            <h3 style="color: #00ffff; margin-top: 0;">Contact Details:</h3>
            <p><strong style="color: #00ff00;">Name:</strong> ${name}</p>
            <p><strong style="color: #00ff00;">Email:</strong> ${email}</p>
            <p><strong style="color: #00ff00;">Subject:</strong> ${subject || 'No subject'}</p>
          </div>
          
          <div style="background-color: #1a1a2e; padding: 15px; border-left: 4px solid #ff00ff; margin: 10px 0;">
            <h3 style="color: #ff00ff; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #00ff00;">
            <p style="color: #00ff00; font-size: 12px;">
              📧 Sent from Pavan Tejavath's Portfolio Website<br>
              ⚡ Cyberpunk Contact System Active
            </p>
          </div>
        </div>
      `,
      text: `
        NEW PORTFOLIO CONTACT
        ====================
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'No subject'}
        
        Message:
        ${message}
        
        ---
        Sent from Pavan Tejavath's Portfolio Website
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email sending error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your email credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check your SMTP settings.';
    } else if (error.response) {
      errorMessage = `SMTP Error: ${error.response}`;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
