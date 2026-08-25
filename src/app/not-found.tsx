import Link from "next/link";
import { SiteShell } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mt-16">
        <h1 className="font-display text-4xl text-ink">We couldn’t find that page</h1>
        <p className="mt-3 text-ink-muted">
          Try a different query with ⌘K, browse the desks below, or return home.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-voice-dark underline underline-offset-4">
            Home
          </Link>
          <Link href="/guides" className="text-voice-dark underline underline-offset-4">
            Guides
          </Link>
          <Link href="/how-to" className="text-voice-dark underline underline-offset-4">
            How-tos
          </Link>
          <Link href="/faucets" className="text-voice-dark underline underline-offset-4">
            Faucets
          </Link>
          <Link href="/news" className="text-voice-dark underline underline-offset-4">
            News
          </Link>
          <Link href="/contact" className="text-voice-dark underline underline-offset-4">
            Contact
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
