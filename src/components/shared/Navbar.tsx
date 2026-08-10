'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/services/auth.service';
import { getAuthToken, removeAuthToken } from '@/lib/utils/auth-helpers';
import Cookies from 'js-cookie';

export function Navbar() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token && !user) {
      getCurrentUser()
        .then((data) => setUser(data))
        .catch(() => {
          removeAuthToken();
        });
    }
  }, [user, setUser]);

  const handleLogout = () => {
    removeAuthToken();
    Cookies.remove('role');
    setUser(null);
    router.push('/');
  };

  const dashboardLink =
    user?.role === 'CUSTOMER'
      ? '/dashboard/customer'
      : user?.role === 'TECHNICIAN'
      ? '/dashboard/technician'
      : user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : '/';

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          FixItNow 🔧
        </Link>

        <div className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium hover:underline">
            Services
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href={dashboardLink}>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}