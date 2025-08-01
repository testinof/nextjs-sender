"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Send, Upload } from "lucide-react";
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
    setEmailReport("");
    setStatus("");
    setProgress(0);

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

      for (let i = 0; i < emailList.length; i += batchSize) {
        const batch = emailList.slice(i, i + batchSize);
        const batchEmails = batch.map((recipientEmail) => ({
          to: recipientEmail.trim(),
          subject,
          attachments: fileData,
        }));

        const batchResults = await sendEmailBatch(batchEmails);

        const reportLines = batchResults.map(
          ({ to, status }: { to: string; status: string }) => `${to} ${status}`
        );

        setEmailReport((prev) => `${prev}\n${reportLines.join("\n")}`);

        const currentProgress = Math.min(
          ((i + batchSize) / emailList.length) * 100,
          100
        );
        setProgress(currentProgress);
        setStatus(`Data sent successfully`);
      }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <CardTitle className="text-2xl font-bold">
            Secure File Delivery
          </CardTitle>
          <CardDescription className="text-blue-100">
            Send private files securely to multiple recipients
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Files to Send
              </h3>
              <FileUploadArea
                files={files}
                setFiles={setFiles}
                label="Drag & drop files or click to browse"
                multiple={true}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Recipient List
              </h3>
              <EmailListUpload
                file={emailListFile}
                setFile={setEmailListFile}
                label="Upload email list (.txt file)"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Email Details
              </h3>
              <EmailForm
                subject={subject}
                setSubject={setSubject}
                message={message}
                setMessage={setMessage}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          {status && (
            <div
              className={`text-sm mb-4 p-3 rounded-lg ${
                status.includes("Error")
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {status}
            </div>
          )}

          {isSending && (
            <div className="w-full mb-4">
              <Progress
                value={progress}
                className="h-2 bg-gray-200"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {progress.toFixed(0)}% complete
              </div>
            </div>
          )}

          {emailReport && (
            <div className="w-full max-h-48 overflow-y-auto mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Delivery Report:
              </h4>
              <ul className="text-sm space-y-1">
                {emailReport.split("\n").map((line, idx) => (
                  <li
                    key={idx}
                    className={`font-mono text-xs ${
                      line.includes("success")
                        ? "text-green-600"
                        : line.includes("failed")
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSending}
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md transition-all"
            size="lg"
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Files Securely
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>

    // <Card className="w-full max-w-2xl mx-auto mt-10">
    //   <CardHeader>
    //     <CardTitle>Send Private Files</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <FileUploadArea
    //         files={files}
    //         setFiles={setFiles}
    //         label="Drop files (.pdf, .docx, .xlsx, .pptx, etc.) here or click to upload"
    //         multiple={true}
    //         dragActive={dragActive}
    //         handleDrag={handleDrag}
    //         handleDrop={handleDrop}
    //         handleFileChange={handleFileChange}
    //       />
    //       <EmailListUpload
    //         file={emailListFile}
    //         setFile={setEmailListFile}
    //         label="Drop email list (.txt) here or click to upload"
    //       />
    //       <EmailForm
    //         subject={subject}
    //         setSubject={setSubject}
    //         message={message}
    //         setMessage={setMessage}
    //       />
    //     </form>
    //   </CardContent>
    //   <CardFooter className="flex flex-col items-stretch">
    //     <div className="text-sm text-muted-foreground mb-2 text-green-700">
    //       {status}
    //     </div>
    //     <ul className="text-sm text-blue-500 mb-2">
    //       {emailReport.split("\n").map((line, idx) => (
    //         <li key={idx}>{line}</li>
    //       ))}
    //     </ul>
    //     {isSending && <Progress value={progress} className="mb-2" />}
    //     <Button
    //       type="submit"
    //       variant="ghost"
    //       onClick={handleSubmit}
    //       disabled={isSending}
    //     >
    //       {isSending ? (
    //         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //       ) : (
    //         <Send className="mr-2 h-4 w-4" />
    //       )}
    //       {isSending ? "Sending..." : "Send Files"}
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
