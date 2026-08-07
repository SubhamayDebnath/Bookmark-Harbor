import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Bookmark,
  Database,
  Files,
  HardDrive,
  Archive,
  ListTree,
  Ruler,
  Clock,
  Cpu,
  MonitorCog,
  Layers,
  MemoryStick,
  Gauge,
  Server,
  RefreshCw,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import AdminNav from '@/components/admin/AdminNav';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useAdmin } from '@/hooks/useAdmin';
import type { StatsResponse } from '@/types/admin.types';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

const palette = [
  { bg: 'bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400' },
  { bg: 'bg-sky-500/15', text: 'text-sky-600 dark:text-sky-400' },
  { bg: 'bg-amber-500/15', text: 'text-amber-600 dark:text-amber-400' },
  { bg: 'bg-violet-500/15', text: 'text-violet-600 dark:text-violet-400' },
  { bg: 'bg-rose-500/15', text: 'text-rose-600 dark:text-rose-400' },
];

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

function StatGroup({ title, items }: { title: string; items: StatItem[] }) {
  return (
    <div>
      <h2 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          const color = palette[i % palette.length];

          return (
            <div
              key={item.label}
              className="bg-card flex items-center gap-2.5 rounded-lg border p-2.5"
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-md ${color.bg}`}
              >
                <Icon className={`size-4 ${color.text}`} />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground truncate text-[11px]">
                  {item.label}
                </p>
                <p className="truncate text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminStatsPage() {
  const { getStats, loading } = useAdmin();
  const [stats, setStats] = useState<StatsResponse['data'] | null>(null);
  const handleRefetch = async () => {
    const result = await getStats();
    if (result) {
      setStats(result);
    }
  };
  useEffect(() => {
    const loadStats = async () => {
      const result = await getStats();
      setStats(result);
    };
    loadStats();
  }, [getStats]);

  if (loading && !stats) {
    return <LoadingScreen />;
  }

  if (!stats) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-muted-foreground">Unable to load stats.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Server Stats — Admin — Bookmark Harbor</title>
      </Helmet>
      <section className="flex flex-col gap-5 py-5">
        <AdminNav />

        <div className="flex items-center gap-3">
          <h1 className="text-primary text-lg font-semibold tracking-tight">
            Server Stats
          </h1>
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleRefetch}
          >
            <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        <StatGroup
          title="Users"
          items={[
            { label: 'Total Users', value: stats.users.total, icon: Users },
            { label: 'Active', value: stats.users.active, icon: UserCheck },
            { label: 'Inactive', value: stats.users.inactive, icon: UserX },
            { label: 'Admins', value: stats.users.admins, icon: ShieldCheck },
          ]}
        />

        <StatGroup
          title="Bookmarks"
          items={[
            {
              label: 'Total Bookmarks',
              value: stats.bookmarks.total,
              icon: Bookmark,
            },
          ]}
        />

        {stats.mongo && (
          <StatGroup
            title="Database"
            items={[
              {
                label: 'Collections',
                value: stats.mongo.collections,
                icon: Database,
              },
              { label: 'Documents', value: stats.mongo.objects, icon: Files },
              {
                label: 'Data Size',
                value: formatBytes(stats.mongo.dataSize),
                icon: HardDrive,
              },
              {
                label: 'Storage Size',
                value: formatBytes(stats.mongo.storageSize),
                icon: Archive,
              },
              { label: 'Indexes', value: stats.mongo.indexes, icon: ListTree },
              {
                label: 'Index Size',
                value: formatBytes(stats.mongo.indexSize),
                icon: Layers,
              },
              {
                label: 'Avg Object Size',
                value: formatBytes(stats.mongo.avgObjSize),
                icon: Ruler,
              },
            ]}
          />
        )}

        <StatGroup
          title="Server"
          items={[
            {
              label: 'Uptime',
              value: formatUptime(stats.server.uptimeSeconds),
              icon: Clock,
            },
            {
              label: 'Node Version',
              value: stats.server.nodeVersion,
              icon: Server,
            },
            {
              label: 'Platform',
              value: `${stats.server.platform} (${stats.server.arch})`,
              icon: MonitorCog,
            },
            { label: 'CPU Cores', value: stats.server.cpuCount, icon: Cpu },
            {
              label: 'Heap Used',
              value: formatBytes(stats.server.memory.heapUsed),
              icon: MemoryStick,
            },
            {
              label: 'RSS Memory',
              value: formatBytes(stats.server.memory.rss),
              icon: Gauge,
            },
            {
              label: 'Total System Memory',
              value: formatBytes(stats.server.totalSystemMemory),
              icon: MemoryStick,
            },
            {
              label: 'Free System Memory',
              value: formatBytes(stats.server.freeSystemMemory),
              icon: MemoryStick,
            },
          ]}
        />
      </section>
    </>
  );
}

export default AdminStatsPage;
