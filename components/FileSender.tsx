"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import { sendEmailBatch } from "@/lib/fileApi";
import { Progress } from "@/components/ui/progress";
import { FileUploadArea } from "@/components/FileUploadArea";
import { EmailForm } from "@/components/EmailForm";
import { EmailListUpload } from "@/components/EmailListUpload";

export function FileSender() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("");
  const [emailReport, setEmailReport] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailListFile, setEmailListFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setStatus("Please select at least one file to send.");
      return;
    }

    if (!emailListFile) {
      setStatus(
        "Please upload a .txt file containing the list of email addresses."
      );
      return;
    }

    setStatus("Preparing files and email list...");
    setIsSending(true);
    setProgress(0);

    try {
      // Prepare file data
      const fileData = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(new Blob([arrayBuffer]));
          });
          const base64Data = base64.split(",")[1];
          return {
            originalFilename: file.name,
            fileBuffer: base64Data,
          };
        })
      );

      // Read email list from file
      const emailListContent = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(emailListFile);
      });

      const emailList = emailListContent
        .split(/\r?\n/)
        .filter((email) => email.trim() !== "");

      setStatus(`Sending emails to ${emailList.length} recipients...`);

      const batchSize = 100;
      const totalBatches = Math.ceil(emailList.length / batchSize);

      for (let i = 0; i < emailList.length; i += batchSize) {
        const batch = emailList.slice(i, i + batchSize);
        const batchEmails = batch.map((recipientEmail) => ({
          to: recipientEmail.trim(),
          subject,
          text: message,
          attachments: fileData,
        }));

        const { succeeded, failed } = await sendEmailBatch(batchEmails);

        setEmailReport(
          `Batch ${
            Math.floor(i / batchSize) + 1
          }/${totalBatches}: Succeeded: ${succeeded}, Failed: ${failed}`
        );

        const currentProgress = Math.min(
          ((i + batchSize) / emailList.length) * 100,
          100
        );
        setProgress(currentProgress);
        setStatus(
          `Progress: ${currentProgress.toFixed(2)}% (${i + batchSize}/${
            emailList.length
          })`
        );
      }

      setStatus("Files sent successfully to all recipients!");
      setFiles([]);
      setEmailListFile(null);
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setStatus(
        `Error: ${
          error instanceof Error ? error.message : "An unknown error occurred"
        }`
      );
    } finally {
      setIsSending(false);
      setProgress(100);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Send Private Files</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FileUploadArea
            files={files}
            setFiles={setFiles}
            label="Drop files (.pdf, .docx, .xlsx, .pptx, etc.) here or click to upload"
            multiple={true}
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
          />
          <EmailListUpload
            file={emailListFile}
            setFile={setEmailListFile}
            label="Drop email list (.txt) here or click to upload"
          />
          <EmailForm
            subject={subject}
            setSubject={setSubject}
            message={message}
            setMessage={setMessage}
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <div className="text-sm text-muted-foreground mb-2 text-green-700">
          {status}
        </div>
        <div className="text-sm text-muted-foreground mb-2 text-blue-500">
          {emailReport}
        </div>
        {isSending && <Progress value={progress} className="mb-2" />}
        <Button
          type="submit"
          variant="ghost"
          onClick={handleSubmit}
          disabled={isSending}
        >
          {isSending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {isSending ? "Sending..." : "Send Files"}
        </Button>
      </CardFooter>
    </Card>
  );
}
