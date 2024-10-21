import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EmailListUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  label: string;
}

export function EmailListUpload({
  file,
  setFile,
  label,
}: EmailListUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type === "text/plain") {
          setFile(droppedFile);
        } else {
          alert("Please upload a .txt file for the email list.");
        }
      }
    },
    [setFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        if (selectedFile.type === "text/plain") {
          setFile(selectedFile);
        } else {
          alert("Please upload a .txt file for the email list.");
        }
      }
    },
    [setFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center ${
        dragActive ? "border-primary" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept=".txt"
        className="hidden"
        id="emailListInput"
      />
      <Button variant="ghost" type="button">
        {label}
      </Button>
      {file && (
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">{file.name}</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
