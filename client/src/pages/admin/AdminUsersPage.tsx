import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Eye, ShieldCheck, ShieldOff, UserCheck, UserX } from 'lucide-react';
import AdminNav from '@/components/admin/AdminNav';
import AppPagination from '@/components/common/AppPagination';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdmin } from '@/hooks/useAdmin';
import type { AdminUser } from '@/types/admin.types';
import type { Pagination } from '@/types/bookmark.types';

const LIMIT = 10;
const SEARCH_DEBOUNCE_MS = 400;

const roleItems = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

function AdminUsersPage() {
  const { getUsers, updateUserRole, toggleUserActive } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const q = searchParams.get('q') || '';
  const role = searchParams.get('role') || 'all';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const { users, pagination } = await getUsers({
        page,
        limit: LIMIT,
        q,
        role: role === 'all' ? undefined : role,
      });
      setUsers(users);
      setPagination(pagination);
      setInitialLoading(false);
    };
    loadUsers();
  }, [page, q, role, getUsers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== q) {
        updateParam('q', searchInput);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleToggleRole = async (id: string) => {
    setActioningId(id);
    try {
      const updated = await updateUserRole(id);
      if (updated) {
        setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
      }
    } finally {
      setActioningId(null);
    }
  };

  const handleToggleActive = async (id: string) => {
    setActioningId(id);
    try {
      const updated = await toggleUserActive(id);
      if (updated) {
        setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
      }
    } finally {
      setActioningId(null);
    }
  };

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Manage Users — Admin — Bookmark Harbor</title>
      </Helmet>
      <section className="flex w-full flex-col gap-5 py-5">
        <AdminNav />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-primary text-lg font-semibold tracking-tight">
            Users
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={role}
              onValueChange={(value) => updateParam('role', value)}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-64">
              <Input
                placeholder="Search users...."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="flex w-full items-center justify-center gap-3 px-5 py-20">
            <p className="text-muted-foreground text-center">No users found.</p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full ${
                            user.role === 'admin'
                              ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400'
                              : 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                          }`}
                          variant="secondary"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full ${
                            user.isActive
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          }`}
                          variant="secondary"
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleString()
                          : '—'}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="Toggle role"
                            disabled={actioningId === user._id}
                            onClick={() => handleToggleRole(user._id)}
                          >
                            {user.role === 'admin' ? (
                              <ShieldOff />
                            ) : (
                              <ShieldCheck />
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="Toggle active status"
                            disabled={actioningId === user._id}
                            onClick={() => handleToggleActive(user._id)}
                          >
                            {user.isActive ? <UserX /> : <UserCheck />}
                          </Button>

                          <Button variant="outline" size="icon-xs" asChild>
                            <Link to={`/dashboard/admin/users/${user._id}`}>
                              <Eye />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {pagination && pagination.totalPages > 1 && (
              <AppPagination pagination={pagination} />
            )}
          </>
        )}
      </section>
    </>
  );
}

export default AdminUsersPage;
