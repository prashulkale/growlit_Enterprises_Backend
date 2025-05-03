import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      <Toaster />
    </>
  );
}