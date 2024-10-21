import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EmailFormProps {
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export function EmailForm({
  subject,
  setSubject,
  message,
  setMessage,
}: EmailFormProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          placeholder="File transfer"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message here"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </>
  );
}
