import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { glossaryDefinition } from "@/content/glossary";

type GuideRichTextProps = {
  text: string;
  className?: string;
};

/**
 * Renders guide paragraph markup:
 * - [[term]] → glossary hover definition
 * - [label](/guides/slug) → internal guide link
 */
export function GuideRichText({ text, className }: GuideRichTextProps) {
  return <p className={className}>{parseInline(text)}</p>;
}

const TOKEN =
  /(\[\[([^\]]+)\]\])|(\[([^\]]+)\]\((\/guides\/[a-z0-9-/]+)\))/gi;

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(TOKEN.source, "gi");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={`t-${last}`}>{text.slice(last, match.index)}</Fragment>);
    }

    if (match[1] && match[2]) {
      const term = match[2];
      const definition = glossaryDefinition(term);
      nodes.push(
        <span
          key={`g-${match.index}`}
          className="glossary-term"
          tabIndex={0}
          data-definition={definition || "No definition on file—treat unfamiliar terms carefully."}
          title={definition || undefined}
        >
          {term}
        </span>,
      );
    } else if (match[3] && match[4] && match[5]) {
      nodes.push(
        <Link
          key={`l-${match.index}`}
          href={match[5]}
          className="guide-inline-link font-medium text-voice-dark underline decoration-voice/40 underline-offset-2 hover:decoration-voice"
        >
          {match[4]}
        </Link>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(<Fragment key={`t-${last}`}>{text.slice(last)}</Fragment>);
  }

  return nodes;
}
