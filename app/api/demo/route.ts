import { NextResponse } from 'next/server';
import { demoSend } from "@/lib/sendFile";


export async function POST() {
  try {
  

    await demoSend();

    return NextResponse.json({ message: "Email batch processed" }, { status: 200 });
  } catch (error) {
    console.error('Error processing email batch:', error);
    return NextResponse.json({ error: 'Failed to process email batch' }, { status: 500 });
  }
}


