import { Suspense } from 'react';
import { LoginFormClient } from '@/components/admin/LoginFormClient';

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginFormClient />
    </Suspense>
  );
}
