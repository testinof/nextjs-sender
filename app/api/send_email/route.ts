import { NextRequest, NextResponse } from 'next/server';
import { sendFile } from "@/lib/sendFile";
import Bottleneck from 'bottleneck';

// Create a rate limiter
const limiter = new Bottleneck({
  maxConcurrent: 5, // Adjust based on your SMTP server's capacity
  minTime: 200 // 200ms between each email
});

// export async function POST(request: NextRequest) {
//   try {
//     const { emails } = await request.json();

//     if (!Array.isArray(emails) || emails.length === 0) {
//       return NextResponse.json({ error: 'Invalid or empty email batch' }, { status: 400 });
//     }

//     const results = await Promise.allSettled(emails.map(email => 
//       limiter.schedule(() => processEmail(email))
//     ));

//     console.log("result: ", results)

//     const succeeded = results.filter(r => r.status === 'fulfilled').length;
//     const failed = results.filter(r => r.status === 'rejected').length;

//     return NextResponse.json({ message: 'Email batch processed', succeeded, failed }, { status: 200 });
//   } catch (error) {
//     console.error('Error processing email batch:', error);
//     return NextResponse.json({ error: 'Failed to process email batch' }, { status: 500 });
//   }
// }

// async function processEmail(email: {
//   to: string;
//   subject: string;
//   attachments?: { originalFilename: string; fileBuffer: string }[];
// }) {
//   const { to, subject, attachments } = email;

//   if (!to) throw new Error("Missing 'to' email address");
//   if (!subject) throw new Error("Missing 'subject'");

//   if (attachments && attachments.length > 0) {
//     for (const attachment of attachments) {
//       const { originalFilename, fileBuffer } = attachment;
//       if (!originalFilename || !fileBuffer) {
//         console.warn("Skipping invalid attachment:", attachment);
//         continue; // skip invalid attachment
//       }

//       await sendFile(to, subject);
//     }
//   } else {
//     // Send email without attachment
//     await sendFile(to, subject);
//   }
// }





export async function POST(request: NextRequest) {
  try {
    const { emails } = await request.json();

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty email batch' }, { status: 400 });
    }

    const results = await Promise.all(
      emails.map(email => limiter.schedule(() => processEmail(email)))
    );

    return NextResponse.json({
      message: 'Email batch processed',
      results, // now contains array of { to, status }
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing email batch:', error);
    return NextResponse.json({ error: 'Failed to process email batch' }, { status: 500 });
  }
}







async function processEmail(email: {
  to: string;
  subject: string;
  attachments?: { originalFilename: string; fileBuffer: string }[];
}): Promise<{ to: string; status: "succeeded" | "failed" }> {
  const { to, subject, attachments } = email;

  try {
    if (!to || !subject) throw new Error("Missing required fields");

    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        if (!attachment.originalFilename || !attachment.fileBuffer) {
          continue; // Skip invalid attachment
        }
        await sendFile(to, subject); // Can be adjusted to accept attachments
      }
    } else {
      await sendFile(to, subject);
    }

    return { to, status: "succeeded" };
  } catch (error) {
    console.error(`Error sending to ${to}:`, error);
    return { to, status: "failed" };
  }
}
