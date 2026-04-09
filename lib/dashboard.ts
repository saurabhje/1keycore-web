import { promises as fs } from "fs";
import path from "path";

export interface UserStatsFile {
  id?: string;
  name?: string;
  email?: string;
  team?: string;
  requests?: number;
  requestsMade?: number;
  tokens?: number;
  tokensUsed?: number;
  cacheHits?: number;
  providerBreakdown?: Array<{
    provider: string;
    requests?: number;
    tokens?: number;
    cacheHits?: number;
    costUsd?: number;
  }>;
  providers?: Record<
    string,
    {
      requests?: number;
      tokens?: number;
      cacheHits?: number;
      costUsd?: number;
    }
  >;
  updatedAt?: string;
}

export interface DashboardUserStat {
  id: string;
  name: string;
  team: string;
  requests: number;
  tokens: number;
  cacheHits: number;
  cacheHitRate: number;
  updatedAt: string | null;
  providerBreakdown: Array<{
    provider: string;
    requests: number;
    tokens: number;
    cacheHits: number;
    costUsd: number;
  }>;
}

export interface ProviderAggregate {
  provider: string;
  requests: number;
  tokens: number;
  cacheHits: number;
  costUsd: number;
}

export interface DashboardSummary {
  users: DashboardUserStat[];
  totalRequests: number;
  totalTokens: number;
  totalCacheHits: number;
  cacheHitRate: number;
  providerBreakdown: ProviderAggregate[];
}

const DATA_DIR = path.join(process.cwd(), "data", "user-stats");

function asNumber(...values: Array<number | undefined>) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }
  return 0;
}

function normalizeUserStat(fileName: string, raw: UserStatsFile): DashboardUserStat {
  const requests = asNumber(raw.requests, raw.requestsMade);
  const tokens = asNumber(raw.tokens, raw.tokensUsed);
  const providerBreakdown = [
    ...(raw.providerBreakdown ?? []).map((entry) => ({
      provider: entry.provider,
      requests: asNumber(entry.requests),
      tokens: asNumber(entry.tokens),
      cacheHits: asNumber(entry.cacheHits),
      costUsd: asNumber(entry.costUsd),
    })),
    ...Object.entries(raw.providers ?? {}).map(([provider, entry]) => ({
      provider,
      requests: asNumber(entry.requests),
      tokens: asNumber(entry.tokens),
      cacheHits: asNumber(entry.cacheHits),
      costUsd: asNumber(entry.costUsd),
    })),
  ];
  const cacheHits = Math.min(
    requests,
    asNumber(raw.cacheHits, providerBreakdown.reduce((sum, entry) => sum + entry.cacheHits, 0)),
  );

  return {
    id: raw.id ?? fileName.replace(/\.json$/i, ""),
    name: raw.name ?? raw.email ?? "Unknown user",
    team: raw.team ?? "Unassigned",
    requests,
    tokens,
    cacheHits,
    cacheHitRate: requests > 0 ? cacheHits / requests : 0,
    updatedAt: raw.updatedAt ?? null,
    providerBreakdown,
  };
}

export async function readDashboardSummary(): Promise<DashboardSummary> {
  let fileNames: string[] = [];

  try {
    fileNames = (await fs.readdir(DATA_DIR)).filter((file) => file.endsWith(".json"));
  } catch {
    return {
      users: [],
      totalRequests: 0,
      totalTokens: 0,
      totalCacheHits: 0,
      cacheHitRate: 0,
      providerBreakdown: [],
    };
  }

  const users = (
    await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf8");
          return normalizeUserStat(fileName, JSON.parse(raw) as UserStatsFile);
        } catch {
          return null;
        }
      }),
    )
  )
    .filter((user): user is DashboardUserStat => user !== null)
    .sort((a, b) => b.requests - a.requests);

  const totalRequests = users.reduce((sum, user) => sum + user.requests, 0);
  const totalTokens = users.reduce((sum, user) => sum + user.tokens, 0);
  const totalCacheHits = users.reduce((sum, user) => sum + user.cacheHits, 0);

  const providerMap = new Map<string, ProviderAggregate>();
  for (const user of users) {
    for (const entry of user.providerBreakdown) {
      const current = providerMap.get(entry.provider) ?? {
        provider: entry.provider,
        requests: 0,
        tokens: 0,
        cacheHits: 0,
        costUsd: 0,
      };
      current.requests += entry.requests;
      current.tokens += entry.tokens;
      current.cacheHits += entry.cacheHits;
      current.costUsd += entry.costUsd;
      providerMap.set(entry.provider, current);
    }
  }

  return {
    users,
    totalRequests,
    totalTokens,
    totalCacheHits,
    cacheHitRate: totalRequests > 0 ? totalCacheHits / totalRequests : 0,
    providerBreakdown: Array.from(providerMap.values()).sort((a, b) => b.requests - a.requests),
  };
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 0,
  }).format(value);
}

export function formatWholeNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function userStatus(user: DashboardUserStat) {
  if (user.requests >= 1000 || user.tokens >= 3_000_000) {
    return "spiking" as const;
  }
  if (user.cacheHitRate < 0.8) {
    return "watch" as const;
  }
  return "healthy" as const;
}
