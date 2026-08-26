import Link from "next/link";
import {
  clusterHowtoNodes,
  clusterLearnNodes,
  clusterToolNodes,
  findNodeByPath,
  getBitcoinFaucetsCluster,
  nodeMatchesPath,
  type TopicCluster,
} from "@/lib/topic-clusters";

type Props = {
  cluster?: TopicCluster;
  currentPath: string;
  variant?: "compact" | "full";
};

function NodeLink({
  node,
  currentPath,
  showRole,
}: {
  node: { path: string; title: string; role: string; blurb?: string };
  currentPath: string;
  showRole?: boolean;
}) {
  const active = nodeMatchesPath({ path: node.path } as { path: string }, currentPath);
  return (
    <li>
      <Link
        href={node.path}
        aria-current={active ? "page" : undefined}
        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
          active
            ? "bg-voice-glow font-medium text-voice-dark"
            : "text-ink-muted hover:bg-paper hover:text-ink"
        }`}
      >
        <span>{node.title}</span>
        {showRole && node.role === "pillar" ? (
          <span className="ml-2 text-xs uppercase tracking-wide text-voice">Pillar</span>
        ) : null}
        {showRole && node.blurb ? (
          <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{node.blurb}</span>
        ) : null}
      </Link>
    </li>
  );
}

export function TopicClusterNav({ cluster, currentPath, variant = "compact" }: Props) {
  const c = cluster ?? getBitcoinFaucetsCluster();
  const learn = clusterLearnNodes(c);
  const howtos = clusterHowtoNodes(c);
  const tools = clusterToolNodes(c);
  const current = findNodeByPath(c, currentPath);

  if (variant === "full") {
    return (
      <nav
        aria-label={`${c.name} topical cluster`}
        className="rounded-2xl border border-paper-line bg-paper-raised p-5 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
          Topical cluster
        </p>
        <h2 className="mt-1 font-display text-xl text-ink">{c.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.hubDescription}</p>
        <Link
          href={c.hubPath}
          className="mt-3 inline-block text-sm font-medium text-voice-dark underline underline-offset-4"
        >
          View full cluster map
        </Link>

        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Learn</h3>
          <ul className="mt-2 space-y-1">
            {learn.map((node) => (
              <NodeLink key={node.id} node={node} currentPath={currentPath} showRole />
            ))}
          </ul>
        </div>

        {howtos.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">How-tos</h3>
            <ul className="mt-2 space-y-1">
              {howtos.map((node) => (
                <NodeLink key={node.id} node={node} currentPath={currentPath} />
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tools</h3>
          <ul className="mt-2 space-y-1">
            {tools.map((node) => (
              <NodeLink key={node.id} node={node} currentPath={currentPath} />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <aside
      aria-label={`${c.name} cluster navigation`}
      className="rounded-xl border border-paper-line bg-voice-glow/25 p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-voice-dark">
        {c.name}
      </p>
      <p className="mt-1 text-sm text-ink-muted">
        {current ? `You are reading: ${current.title}` : "Explore linked guides and tools."}
      </p>
      <ul className="mt-3 max-h-[28rem] space-y-0.5 overflow-y-auto">
        {learn.map((node) => (
          <NodeLink key={node.id} node={node} currentPath={currentPath} />
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        <Link href={c.hubPath} className="font-medium text-voice-dark underline underline-offset-2">
          Full cluster
        </Link>
        {tools.map((node) => (
          <Link
            key={node.id}
            href={node.path}
            className="text-ink-muted underline underline-offset-2 hover:text-voice-dark"
          >
            {node.kind === "database" ? "Payout database" : "Desk"}
          </Link>
        ))}
      </div>
    </aside>
  );
}
