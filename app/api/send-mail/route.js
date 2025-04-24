import nodemailer from "nodemailer";

export async function POST(request) {
    const {
        firstName,
        lastName,
        email,
        phone,
        company,
        referralSource,
        projectDetails,
        needNDA,
        services,
    } = await request.json();

    const fullName = `${firstName} ${lastName}`;
    let server_email = process.env.EMAIL
    let server_pass = process.env.PASS

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: server_email,
            pass: server_pass
            //     user: 'abhishek.singh.dev147@gmail.com',
            //   pass: 'ckdz wzif ojkz pczi',
        },
    });

    const html = `
    <html>
    <body style="font-family:sans-serif;padding:20px;background-color:#f9f9f9;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;">
        <h2 style="color:#2c3e50;">🚀 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Referral Source:</strong> ${referralSource}</p>
        <p><strong>Project Details:</strong> ${projectDetails}</p>
        <p><strong>NDA Required:</strong> ${needNDA ? "Yes" : "No"}</p>
        <p><strong>Services:</strong></p>
        <ul>${services.map(service => `<li>${service}</li>`).join('')}</ul>
      </div>
    </body>
    </html>
  `;

    try {
        await transporter.sendMail({
            from: `" <${email}>`,
            to: "abhishekssingh0000@gmail.com",
            subject: `New Inquiry from ${fullName}`,
            html,
        });

        return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Email send error:", error);
        return new Response(JSON.stringify({ message: "Failed to send email", error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
