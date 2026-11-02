import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Robust Markdown parser for headings, lists, quotes, code, links, formatting
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = (key: number) => {
    if (!currentList) return null;
    const ListTag = currentList.type;
    const listElem = (
      <ListTag
        key={`list-${key}`}
        className={`my-4 pl-6 space-y-2 text-slate-700 ${
          currentList.type === "ul" ? "list-disc marker:text-blue-600" : "list-decimal marker:text-blue-600"
        }`}
      >
        {currentList.items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {formatInline(item)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
    return listElem;
  };

  const formatInline = (text: string): React.ReactNode => {
    // Process bold (**text**), code (`code`), italic (*text*), link [text](url)
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchStr = match[0];
      if (matchStr.startsWith("**") && matchStr.endsWith("**")) {
        parts.push(
          <strong key={match.index} className="font-semibold text-slate-900">
            {matchStr.slice(2, -2)}
          </strong>
        );
      } else if (matchStr.startsWith("`") && matchStr.endsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 text-xs font-mono border border-slate-200"
          >
            {matchStr.slice(1, -1)}
          </code>
        );
      } else if (matchStr.startsWith("[") && matchStr.includes("](")) {
        const titleMatch = matchStr.match(/\[(.*?)\]/);
        const urlMatch = matchStr.match(/\((.*?)\)/);
        if (titleMatch && urlMatch) {
          parts.push(
            <a
              key={match.index}
              href={urlMatch[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline underline-offset-4 font-medium transition-colors"
            >
              {titleMatch[1]}
            </a>
          );
        } else {
          parts.push(matchStr);
        }
      } else if (matchStr.startsWith("*") && matchStr.endsWith("*")) {
        parts.push(
          <em key={match.index} className="italic text-slate-700">
            {matchStr.slice(1, -1)}
          </em>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, index) => {
    // Check code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${index}`}
            className="my-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto shadow-sm"
          >
            <code>{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        const flushed = flushList(index);
        if (flushed) elements.push(flushed);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Check headings
    if (line.startsWith("### ")) {
      const flushed = flushList(index);
      if (flushed) elements.push(flushed);
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-8 mb-3">
          {formatInline(line.replace("### ", ""))}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      const flushed = flushList(index);
      if (flushed) elements.push(flushed);
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200">
          {formatInline(line.replace("## ", ""))}
        </h2>
      );
      return;
    }

    if (line.startsWith("# ")) {
      const flushed = flushList(index);
      if (flushed) elements.push(flushed);
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-12 mb-6">
          {formatInline(line.replace("# ", ""))}
        </h1>
      );
      return;
    }

    // Check blockquotes
    if (line.startsWith("> ")) {
      const flushed = flushList(index);
      if (flushed) elements.push(flushed);
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="my-6 pl-4 border-l-4 border-blue-600 italic text-slate-700 bg-blue-50/60 py-3 pr-4 rounded-r-xl"
        >
          {formatInline(line.replace("> ", ""))}
        </blockquote>
      );
      return;
    }

    // Check unordered lists
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const itemText = line.trim().substring(2);
      if (!currentList || currentList.type !== "ul") {
        const flushed = flushList(index);
        if (flushed) elements.push(flushed);
        currentList = { type: "ul", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      return;
    }

    // Check ordered lists
    const olMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      const itemText = olMatch[2];
      if (!currentList || currentList.type !== "ol") {
        const flushed = flushList(index);
        if (flushed) elements.push(flushed);
        currentList = { type: "ol", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      return;
    }

    // Empty lines
    if (!line.trim()) {
      const flushed = flushList(index);
      if (flushed) elements.push(flushed);
      return;
    }

    // Paragraph
    const flushed = flushList(index);
    if (flushed) elements.push(flushed);
    elements.push(
      <p key={`p-${index}`} className="my-4 text-slate-700 leading-relaxed text-base sm:text-lg">
        {formatInline(line)}
      </p>
    );
  });

  const finalFlushed = flushList(lines.length);
  if (finalFlushed) elements.push(finalFlushed);

  return <div className={`markdown-content ${className}`}>{elements}</div>;
}
