"use server";

import nodemailer from "nodemailer";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendContactEmail(data: { name: string; email: string; phone: string; message: string }) {
  const { name, email, phone, message } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "mail.christian.techieszon.com",
    port: parseInt(process.env.EMAIL_PORT || "465"),
    secure: true, // true for port 465 (SSL), false for 587 (TLS/STARTTLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email 1: Premium notification to Christian
  const notificationMail = {
    from: `"Christian Kpegah Portfolio" <${process.env.EMAIL_USER}>`,
    to: "christiankpegah@gmail.com",
    subject: `📬 New Message from ${name} — Portfolio Contact`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background-color:#0d0c1d;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0c1d;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg,#1a1940,#0f0e50);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
                
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(90deg,#FF5F6D,#FFC371);padding:30px 40px;text-align:center;">
                    <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.85);">Portfolio Dashboard</p>
                    <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;">New Contact Received</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">

                    <p style="margin:0 0 24px;font-size:15px;color:#b0aed0;">
                      Someone has reached out through your portfolio contact form. Here are the details:
                    </p>

                    <!-- Sender Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;margin-bottom:24px;">
                      <tr>
                        <td style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F49D71;">Full Name</p>
                          <p style="margin:6px 0 0;font-size:17px;font-weight:600;color:#ffffff;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F49D71;">Email Address</p>
                          <p style="margin:6px 0 0;font-size:17px;font-weight:600;color:#ffffff;">
                            <a href="mailto:${email}" style="color:#FF5F6D;text-decoration:none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F49D71;">Phone Number</p>
                          <p style="margin:6px 0 0;font-size:17px;font-weight:600;color:#ffffff;">${phone}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F49D71;">Message</p>
                    <div style="background:rgba(255,255,255,0.05);border-left:4px solid #FF5F6D;border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:32px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#d0cef0;">${message}</p>
                    </div>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${email}?subject=Re: Your message to Christian Kpegah" 
                             style="display:inline-block;background:linear-gradient(90deg,#FF5F6D,#FFC371);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 36px;border-radius:50px;letter-spacing:0.5px;">
                            Reply to ${name}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b69a0;">This is an automated notification from your portfolio system.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  // Email 2: Premium acknowledgment to the user
  const acknowledgmentMail = {
    from: `"Christian Kpegah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Message Received — I'll be in touch soon! ✨`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background-color:#0d0c1d;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0c1d;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg,#1a1940,#0f0e50);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.4);">

                <!-- Header Banner -->
                <tr>
                  <td style="background:linear-gradient(90deg,#FF5F6D,#FFC371);padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;font-size:30px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Thanks for reaching out!</h1>
                    <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.9);">Your message has been received successfully.</p>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding:40px 40px 10px;">
                    <h2 style="margin:0 0 16px;font-size:22px;color:#F49D71;">Hi ${name} 👋</h2>
                    <p style="margin:0;font-size:15px;line-height:1.8;color:#b0aed0;">
                      Thank you for taking the time to get in touch! I've received your message and I'm excited to connect with you.
                      I'll review it carefully and get back to you as soon as possible — typically within <strong style="color:#ffffff;">24–48 hours</strong>.
                    </p>
                  </td>
                </tr>

                <!-- Message Copy -->
                <tr>
                  <td style="padding:24px 40px;">
                    <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F49D71;">Your Message</p>
                    <div style="background:rgba(255,255,255,0.05);border-left:4px solid #FFC371;border-radius:0 12px 12px 0;padding:18px 22px;">
                      <p style="margin:0;font-size:14px;line-height:1.7;color:#c0beef;font-style:italic;">${message}</p>
                    </div>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 40px;">
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);" />
                  </td>
                </tr>

                <!-- Connect Section -->
                <tr>
                  <td style="padding:28px 40px;text-align:center;">
                    <p style="margin:0 0 20px;font-size:14px;color:#8886b0;">While you wait, let's connect on social media:</p>
                    <table cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" 
                             style="display:inline-block;background:rgba(255,255,255,0.08);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.12);">
                            LinkedIn
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://github.com/KurtKhris" 
                             style="display:inline-block;background:rgba(255,255,255,0.08);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.12);">
                            GitHub
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://twitter.com/kurt_khris" 
                             style="display:inline-block;background:rgba(255,255,255,0.08);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.12);">
                            Twitter
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Signature -->
                <tr>
                  <td style="padding:0 40px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,95,109,0.08);border-radius:12px;padding:20px 24px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#ffffff;">Christian Kpegah</p>
                          <p style="margin:0;font-size:13px;color:#F49D71;">Frontend Software Engineer</p>
                          <p style="margin:8px 0 0;font-size:13px;color:#8886b0;">
                            <a href="mailto:${process.env.EMAIL_USER}" style="color:#FFC371;text-decoration:none;">${process.env.EMAIL_USER}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px 40px 24px;text-align:center;">
                    <p style="margin:0;font-size:11px;color:#4e4c7a;">
                      You received this because you submitted a contact form at Christian's portfolio.<br/>
                      Please do not reply directly to this email.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    // 1. Send notification to Christian
    await transporter.sendMail(notificationMail);

    // 2. Send acknowledgment to the user
    await transporter.sendMail(acknowledgmentMail);
    
    // 3. Persist to DB
    await prisma.contactMessage.create({
      data: { name, email, phone, message },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error sending email", error);
    return { success: false, error: "Email could not be sent" };
  }
}

export async function getContactMessages() {
  return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
  return { success: true };
}
