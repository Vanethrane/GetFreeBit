/** Normalize paths for trailingSlash: true exports and canonical tags. */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteCanonicalUrl(path: string, domain: string): string {
  const base = domain.replace(/\/$/, "");
  const canonical = canonicalPath(path);
  return `${base}${canonical === "/" ? "/" : canonical}`;
}
