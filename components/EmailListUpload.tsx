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
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
        dragActive
          ? "border-blue-500 bg-blue-50/50"
          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
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
      <div className="flex flex-col items-center">
        <div className="p-3 bg-blue-100 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="block text-sm font-medium text-gray-700">{label}</span>
        <span className="mt-1 block text-xs text-gray-500">
          One email address per line
        </span>
      </div>
      {file && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-700 truncate max-w-xs">
              {file.name}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500"
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

    // <div
    //   className={`border-2 border-dashed rounded-lg p-4 text-center ${
    //     dragActive ? "border-primary" : "border-gray-300"
    //   }`}
    //   onDragEnter={handleDrag}
    //   onDragLeave={handleDrag}
    //   onDragOver={handleDrag}
    //   onDrop={handleDrop}
    //   onClick={handleClick}
    // >
    //   <input
    //     ref={inputRef}
    //     type="file"
    //     onChange={handleChange}
    //     accept=".txt"
    //     className="hidden"
    //     id="emailListInput"
    //   />
    //   <Button variant="ghost" type="button">
    //     {label}
    //   </Button>
    //   {file && (
    //     <div className="mt-2 flex items-center justify-between">
    //       <p className="text-sm text-gray-600">{file.name}</p>
    //       <Button
    //         type="button"
    //         variant="ghost"
    //         size="sm"
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           setFile(null);
    //         }}
    //       >
    //         <X className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   )}
    // </div>
  );
}
