import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain later
      to: process.env.COMPANY_EMAIL || 'moversetechnologies@gmail.com',
      replyTo: email, // Allows you to reply directly to the customer
      subject: `New Contact: ${name}${service ? ` - ${service}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f6f9fc;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
            }
            .header {
              background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              padding: 30px 20px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f9fafb;
              border-left: 4px solid #3b82f6;
              border-radius: 4px;
            }
            .label {
              font-weight: 600;
              color: #1e40af;
              display: block;
              margin-bottom: 8px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #374151;
              font-size: 16px;
              word-wrap: break-word;
            }
            .message-field {
              background: #fff;
              border: 1px solid #e5e7eb;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            }
            .footer {
              background: #f9fafb;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .reply-button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">👤 Name</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email</span>
                <div class="value">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                    ${email}
                  </a>
                </div>
              </div>
              
              ${phone ? `
              <div class="field">
                <span class="label">📱 Phone</span>
                <div class="value">
                  <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">
                    ${phone}
                  </a>
                </div>
              </div>
              ` : ''}
              
              ${service ? `
              <div class="field">
                <span class="label">🛠️ Service Interested</span>
                <div class="value">${service}</div>
              </div>
              ` : ''}
              
              ${message ? `
              <div class="field">
                <span class="label">💬 Message</span>
                <div class="message-field">
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              ` : ''}
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" class="reply-button">
                  Reply to ${name}
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 8px 0;">
                <strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
              <p style="margin: 0;">
                This email was sent from your website contact form.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}