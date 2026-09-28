import DashboardView from '@/features/dashboard/components/DashboardView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | ByteSpace',
  description: 'Your ByteSpace learning dashboard.',
};

const DashboardPage = () => <DashboardView />;

export default DashboardPage;
