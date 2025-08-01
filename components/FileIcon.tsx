export function FileIcon({ extension }: { extension?: string }) {
  const iconClass = "h-5 w-5";
  const colorClass = "text-blue-600";

  switch (extension) {
    case "pdf":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClass} ${colorClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 17V12H16V17H19V7H5V17H8Z" />
          <path d="M10 9H8V11H10V9Z" />
          <path d="M16 9H14V11H16V9Z" />
        </svg>
      );
    case "docx":
    case "doc":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClass} ${colorClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
        </svg>
      );
    case "xlsx":
    case "xls":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClass} ${colorClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM10 12L12 14L10 16L12 18L10 20L8 18L6 20L4 18L6 16L4 14L6 12L4 10L6 8L8 10L10 8L12 10L10 12Z" />
        </svg>
      );
    case "pptx":
    case "ppt":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClass} ${colorClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM15 15V17H9V15H15ZM15 11V13H9V11H15Z" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClass} ${colorClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
        </svg>
      );
  }
}
