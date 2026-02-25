import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Save submission to JSON file
    const submissionsFile = path.join(process.cwd(), "data", "submissions.json");

    // Ensure data directory exists
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

    let submissions: any[] = [];
    try {
      const existing = await fs.readFile(submissionsFile, "utf-8");
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

    // Optional: Send email via SMTP if configured
    if (process.env.SMTP_HOST) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.SMTP_USER,
          subject: `New contact form submission from ${data.name || "Website"}`,
          text: Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n"),
        });
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Vielen Dank für Ihre Nachricht!" });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
