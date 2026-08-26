/**
 * Topical cluster graph — pillar + spokes + tools with explicit internal links.
 * One cluster = one hub (/faucets/learn) + nodes that must link to siblings.
 */

export type ClusterId = "bitcoin-faucets";

export type ClusterNodeRole = "pillar" | "spoke" | "tool" | "howto";

export type ClusterNodeKind =
  | "cluster-article"
  | "guide"
  | "howto"
  | "desk"
  | "database";

export type ClusterNode = {
  id: string;
  title: string;
  primaryKeyword: string;
  role: ClusterNodeRole;
  kind: ClusterNodeKind;
  /** Route path (always leading slash) */
  path: string;
  /** For guide/howto nodes */
  articleSlug?: string;
  /** For cluster-article nodes under /faucets/learn/[slug] */
  clusterSlug?: string;
  status: "live" | "planned";
  blurb: string;
};

export type TopicCluster = {
  id: ClusterId;
  name: string;
  hubPath: string;
  hubTitle: string;
  hubDescription: string;
  pillarId: string;
  nodes: ClusterNode[];
};

export const BITCOIN_FAUCETS_CLUSTER: TopicCluster = {
  id: "bitcoin-faucets",
  name: "Bitcoin Faucets",
  hubPath: "/faucets/learn",
  hubTitle: "Bitcoin Faucets — Learn the cluster",
  hubDescription:
    "Pillar guide, payout mechanics, scams, taxes, and comparisons—linked to the live payout database and referral desk.",
  pillarId: "what-is-a-bitcoin-faucet",
  nodes: [
    {
      id: "what-is-a-bitcoin-faucet",
      title: "What is a Bitcoin faucet?",
      primaryKeyword: "what is a bitcoin faucet",
      role: "pillar",
      kind: "cluster-article",
      path: "/faucets/learn/what-is-a-bitcoin-faucet",
      clusterSlug: "what-is-a-bitcoin-faucet",
      status: "live",
      blurb: "Definition, funding model, and why sats drips exist—not a path to wealth.",
    },
    {
      id: "how-bitcoin-faucets-work",
      title: "How Bitcoin faucets work",
      primaryKeyword: "how bitcoin faucets work",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/how-bitcoin-faucets-work",
      clusterSlug: "how-bitcoin-faucets-work",
      status: "live",
      blurb: "Timers, captchas, ad revenue, and where the sats actually come from.",
    },
    {
      id: "how-faucet-payouts-work",
      title: "How faucet payouts work",
      primaryKeyword: "how faucet payouts work",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/how-faucet-payouts-work",
      clusterSlug: "how-faucet-payouts-work",
      status: "live",
      blurb: "Internal balances, FaucetPay routing, and on-chain exits.",
    },
    {
      id: "faucet-withdrawal-minimums",
      title: "Faucet withdrawal minimums",
      primaryKeyword: "faucet minimum payout",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/faucet-withdrawal-minimums",
      clusterSlug: "faucet-withdrawal-minimums",
      status: "live",
      blurb: "Why minimums trap dust and how to batch before paying network fees.",
    },
    {
      id: "faucet-earning-rates",
      title: "Faucet earning rates",
      primaryKeyword: "bitcoin faucet earning rate",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/faucet-earning-rates",
      clusterSlug: "faucet-earning-rates",
      status: "live",
      blurb: "Realistic sats per hour—not headline claims from best-case streaks.",
    },
    {
      id: "faucet-scams",
      title: "Bitcoin faucet scams",
      primaryKeyword: "bitcoin faucet scam",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/faucet-scams",
      clusterSlug: "faucet-scams",
      status: "live",
      blurb: "Phishing clones, seed-phrase traps, and fake multiply modes.",
    },
    {
      id: "faucet-taxes",
      title: "Faucet taxes (US)",
      primaryKeyword: "bitcoin faucet taxes",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/faucet-taxes",
      clusterSlug: "faucet-taxes",
      status: "live",
      blurb: "Micro-income is still income—how to track drips before filing season.",
    },
    {
      id: "faucet-vs-mining",
      title: "Faucet vs mining",
      primaryKeyword: "faucet vs mining",
      role: "spoke",
      kind: "guide",
      path: "/guides/evaluating-crypto-faucets-time-vs-reward",
      articleSlug: "evaluating-crypto-faucets-time-vs-reward",
      status: "live",
      blurb: "Time-vs-reward math versus ASIC hype and cloud-mining contracts.",
    },
    {
      id: "faucet-vs-staking",
      title: "Faucet vs staking",
      primaryKeyword: "faucet vs staking",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/faucet-vs-staking",
      clusterSlug: "faucet-vs-staking",
      status: "live",
      blurb: "Active claims vs lockups—different risk, different hourly math.",
    },
    {
      id: "lightning-faucets",
      title: "Lightning faucets",
      primaryKeyword: "lightning faucet",
      role: "spoke",
      kind: "cluster-article",
      path: "/faucets/learn/lightning-faucets",
      clusterSlug: "lightning-faucets",
      status: "live",
      blurb: "Sats over Lightning—lower on-chain fees, different custody model.",
    },
    {
      id: "faucet-profitability",
      title: "Bitcoin faucet profitability",
      primaryKeyword: "are bitcoin faucets worth it",
      role: "spoke",
      kind: "guide",
      path: "/guides/evaluating-crypto-faucets-time-vs-reward",
      articleSlug: "evaluating-crypto-faucets-time-vs-reward",
      status: "live",
      blurb: "Scorecard: when hourly return beats your next-best use of time.",
    },
    {
      id: "faucetpay-routing",
      title: "FaucetPay routing",
      primaryKeyword: "faucetpay",
      role: "spoke",
      kind: "guide",
      path: "/guides/how-faucetpay-routing-works-for-micro-earnings",
      articleSlug: "how-faucetpay-routing-works-for-micro-earnings",
      status: "live",
      blurb: "Micro-wallet batching between faucets and self-custody.",
    },
    {
      id: "daily-faucet-routine",
      title: "Daily faucet routine (US)",
      primaryKeyword: "daily bitcoin faucet routine",
      role: "howto",
      kind: "howto",
      path: "/how-to/how-to-run-a-daily-crypto-faucet-routine-in-the-us",
      articleSlug: "how-to-run-a-daily-crypto-faucet-routine-in-the-us",
      status: "live",
      blurb: "Step-by-step US-friendly claim schedule and logging habits.",
    },
    {
      id: "setup-faucetpay",
      title: "Set up FaucetPay",
      primaryKeyword: "how to set up faucetpay",
      role: "howto",
      kind: "howto",
      path: "/how-to/how-to-set-up-faucetpay-and-route-faucet-payouts",
      articleSlug: "how-to-set-up-faucetpay-and-route-faucet-payouts",
      status: "live",
      blurb: "Connect payout addresses and sweep on a schedule.",
    },
    {
      id: "payout-database",
      title: "Bitcoin faucet payout database",
      primaryKeyword: "bitcoin faucet list",
      role: "tool",
      kind: "database",
      path: "/faucets/payouts",
      status: "live",
      blurb: "Live minimums, coins, and FaucetPay rails—verify on each site.",
    },
    {
      id: "referral-desk",
      title: "Faucet referral desk",
      primaryKeyword: "best bitcoin faucets",
      role: "tool",
      kind: "desk",
      path: "/faucets",
      status: "live",
      blurb: "US-accessible platforms with disclosed partner links.",
    },
  ],
};

export const TOPIC_CLUSTERS: TopicCluster[] = [BITCOIN_FAUCETS_CLUSTER];

export function getCluster(id: ClusterId): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find((c) => c.id === id);
}

export function getClusterNode(cluster: TopicCluster, nodeId: string): ClusterNode | undefined {
  return cluster.nodes.find((n) => n.id === nodeId);
}

export function findClusterByPath(path: string): TopicCluster | undefined {
  const normalized = path.replace(/\/$/, "") || "/";
  return TOPIC_CLUSTERS.find(
    (c) =>
      normalized === c.hubPath ||
      c.nodes.some((n) => n.path.replace(/\/$/, "") === normalized),
  );
}

export function findClusterByArticle(slug: string): {
  cluster: TopicCluster;
  node: ClusterNode;
} | undefined {
  for (const cluster of TOPIC_CLUSTERS) {
    const node = cluster.nodes.find(
      (n) =>
        n.articleSlug === slug &&
        (n.kind === "guide" || n.kind === "howto"),
    );
    if (node) return { cluster, node };
  }
  return undefined;
}

export function listLiveClusterNodes(cluster: TopicCluster): ClusterNode[] {
  return cluster.nodes.filter((n) => n.status === "live");
}
