import {
  BITCOIN_FAUCETS_CLUSTER,
  getCluster,
  getClusterNode,
  type ClusterId,
  type ClusterNode,
  type TopicCluster,
} from "@/data/topic-clusters";

export { getCluster, getClusterNode, findClusterByPath, findClusterByArticle } from "@/data/topic-clusters";
export type { ClusterId, ClusterNode, TopicCluster };

export function resolveClusterNodes(cluster: TopicCluster, nodeIds: string[]): ClusterNode[] {
  const seen = new Set<string>();
  const out: ClusterNode[] = [];
  for (const id of nodeIds) {
    if (seen.has(id)) continue;
    const node = getClusterNode(cluster, id);
    if (node && node.status === "live") {
      seen.add(id);
      out.push(node);
    }
  }
  return out;
}

export function clusterLearnNodes(cluster: TopicCluster): ClusterNode[] {
  return cluster.nodes.filter(
    (n) => n.status === "live" && (n.role === "pillar" || n.role === "spoke"),
  );
}

export function clusterToolNodes(cluster: TopicCluster): ClusterNode[] {
  return cluster.nodes.filter((n) => n.status === "live" && n.role === "tool");
}

export function clusterHowtoNodes(cluster: TopicCluster): ClusterNode[] {
  return cluster.nodes.filter((n) => n.status === "live" && n.role === "howto");
}

export function getBitcoinFaucetsCluster(): TopicCluster {
  return BITCOIN_FAUCETS_CLUSTER;
}

export function nodeMatchesPath(node: Pick<ClusterNode, "path">, path: string): boolean {
  return node.path.replace(/\/$/, "") === path.replace(/\/$/, "");
}

export function findNodeByPath(cluster: TopicCluster, path: string): ClusterNode | undefined {
  const normalized = path.replace(/\/$/, "");
  return cluster.nodes.find((n) => n.path.replace(/\/$/, "") === normalized);
}
