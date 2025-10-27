import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Newsletter <onboarding@resend.dev>', // Use your verified domain later
      to: process.env.COMPANY_EMAIL || 'moversetechnologies@gmail.com',
      subject: `New Newsletter Subscriber: ${email}`,
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
              background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .email-badge {
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              padding: 20px 30px;
              border-radius: 12px;
              display: inline-block;
              margin: 30px 0;
              border: 2px solid #3b82f6;
            }
            .email-text {
              font-size: 20px;
              font-weight: 600;
              color: #1e40af;
              margin: 0;
              word-wrap: break-word;
            }
            .info-text {
              color: #6b7280;
              font-size: 14px;
              margin: 20px 0;
            }
            .stats-box {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
              border-left: 4px solid #3b82f6;
            }
            .stats-item {
              margin: 10px 0;
              color: #374151;
            }
            .footer {
              background: #f9fafb;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .action-tip {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              text-align: left;
            }
            .action-tip strong {
              color: #92400e;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Newsletter Subscriber!</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; color: #1e40af; margin-bottom: 10px;">
                🎉 Great news! Someone just subscribed to your newsletter.
              </p>
              
              <div class="email-badge">
                <p class="email-text">📧 ${email}</p>
              </div>
              
              <div class="stats-box">
                <div class="stats-item">
                  <strong>📅 Subscribed:</strong> ${new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                  })}
                </div>
                <div class="stats-item">
                  <strong>🌐 Source:</strong> Website Newsletter Form
                </div>
                <div class="stats-item">
                  <strong>🔔 Status:</strong> Active
                </div>
              </div>
              
              <div class="action-tip">
                <strong>⚡ Next Steps:</strong>
                <ul style="margin: 10px 0; padding-left: 20px; text-align: left;">
                  <li>Add this email to your mailing list platform</li>
                  <li>Send a welcome email to the subscriber</li>
                  <li>Consider adding them to your CRM</li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 8px 0;">
                This notification was sent from your website newsletter form.
              </p>
              <p style="margin: 0;">
                Make sure to comply with email marketing regulations (GDPR, CAN-SPAM, etc.)
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