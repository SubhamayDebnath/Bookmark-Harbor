import { Link, useLocation } from 'react-router';
import { Button } from '../ui/button';

const links = [
  { label: 'Stats', to: '/dashboard/admin' },
  { label: 'Users', to: '/dashboard/admin/users' },
];

function AdminNav() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const active =
          link.to === '/dashboard/admin'
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

        return (
          <Button
            key={link.to}
            variant={active ? 'default' : 'outline'}
            size={'sm'}
            asChild
          >
            <Link to={link.to}>{link.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}

export default AdminNav;
