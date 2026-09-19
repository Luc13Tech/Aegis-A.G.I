import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen p-8">{children}</main>
    </div>
  );
}
