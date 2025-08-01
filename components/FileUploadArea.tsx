import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { FileIcon } from "./FileIcon";

interface FileUploadAreaProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  accept?: string;
  multiple?: boolean;
}

export function FileUploadArea({
  files,
  setFiles,
  dragActive,
  handleDrag,
  handleDrop,
  handleFileChange,
  label,
  accept,
  multiple = false,
}: FileUploadAreaProps) {
  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? "border-blue-500 bg-blue-50/50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="p-3 bg-blue-100 rounded-full mb-3">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <span className="block text-sm font-medium text-gray-700">
            {label}
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            Supports PDF, DOCX, XLSX, PPTX, and more
          </span>
        </Label>
        <Input
          id="file-upload"
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Files:
          </h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FileIcon
                    extension={file.name.split(".").pop()?.toLowerCase()}
                  />
                  <span className="text-sm text-gray-800 truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    // <div>
    //   <div
    //     className={`border-2 border-dashed rounded-lg p-4 text-center ${
    //       dragActive ? "border-primary" : "border-gray-300"
    //     }`}
    //     onDragEnter={handleDrag}
    //     onDragLeave={handleDrag}
    //     onDragOver={handleDrag}
    //     onDrop={handleDrop}
    //   >
    //     <Label htmlFor="file-upload" className="cursor-pointer">
    //       <Upload className="mx-auto h-12 w-12 text-gray-400" />
    //       <span className="mt-2 block text-sm font-semibold text-gray-900">
    //         {label}
    //       </span>
    //     </Label>
    //     <Input
    //       id="file-upload"
    //       type="file"
    //       multiple={multiple}
    //       accept={accept}
    //       className="hidden"
    //       onChange={handleFileChange}
    //     />
    //   </div>
    //   {files.length > 0 && (
    //     <div className="mt-2">
    //       <h4 className="font-semibold">Selected Files:</h4>
    //       <ul className="list-disc pl-5">
    //         {files.map((file, index) => (
    //           <li key={index} className="flex items-center justify-between">
    //             <span>{file.name}</span>
    //             <Button
    //               type="button"
    //               variant="ghost"
    //               size="sm"
    //               onClick={() => setFiles(files.filter((_, i) => i !== index))}
    //             >
    //               <X className="h-4 w-4" />
    //             </Button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
}
