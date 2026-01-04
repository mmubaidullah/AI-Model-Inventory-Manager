import { useState } from "react";

export default function DemoCredentials() {
  const demoEmail = "example@user.com";
  const demoPassword = "aaAA1!";

  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-fit space-y-3 text-sm">
      
      {/* Email */}
      <div className="flex items-center gap-2">
        <span>Demo Email:</span>
        <span className="text-blue-600">{demoEmail}</span>
        <button
          onClick={() => copyToClipboard(demoEmail, "email")}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {copied === "email" ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Password */}
      <div className="flex items-center gap-2">
        <span>Demo Password:</span>
        <span className="text-green-600">{demoPassword}</span>
        <button
          onClick={() => copyToClipboard(demoPassword, "password")}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {copied === "password" ? "Copied ✓" : "Copy"}
        </button>
      </div>

    </div>
  );
}
