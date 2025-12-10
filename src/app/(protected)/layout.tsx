import SideBar from '@/components/dashboard/sideBar';
import DashboardHeader from '@/components/dashboard/dashboardHeader';
import HasSesion from '@/components/dashboard/hasSesion';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HasSesion>
      <div className="flex h-screen w-full">
        <SideBar />

        <div className="w-full">
          <DashboardHeader />

          {children}
        </div>
      </div>
    </HasSesion>
  );
}
