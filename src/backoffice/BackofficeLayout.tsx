import { NavLink, Outlet } from "react-router-dom";

const BackofficeLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center gap-6">
          <div className="font-semibold">Backoffice</div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Dashboard</NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Users</NavLink>
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Settings</NavLink>
            <NavLink to="/" className="ml-6 text-muted-foreground hover:text-foreground">← Portal</NavLink>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default BackofficeLayout;


