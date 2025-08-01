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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-gray-700">
          Email Subject
        </Label>
        <Input
          id="subject"
          type="text"
          placeholder="Your secure file delivery"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    // <>
    //   <div className="space-y-2">
    //     <Label htmlFor="subject">Subject</Label>
    //     <Input
    //       id="subject"
    //       type="text"
    //       placeholder="File transfer"
    //       required
    //       value={subject}
    //       onChange={(e) => setSubject(e.target.value)}
    //     />
    //   </div>
    // </>
  );
}
