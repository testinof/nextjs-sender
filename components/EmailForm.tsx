import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailFormProps {
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export function EmailForm({ subject, setSubject }: EmailFormProps) {
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
    </>
  );
}
