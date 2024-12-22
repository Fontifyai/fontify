import Navbar from "@/components/dashboard/Navbar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="p-4">
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  );
}
