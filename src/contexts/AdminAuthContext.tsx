import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminAuth {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

// Demo credentials - replace with Supabase auth later
const DEMO_ADMIN = { email: "admin@sabbirfitness.com", password: "admin123", name: "প্রশাসক" };

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") {
      setIsAuthenticated(true);
      setAdminName(DEMO_ADMIN.name);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      setIsAuthenticated(true);
      setAdminName(DEMO_ADMIN.name);
      sessionStorage.setItem("admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminName("");
    sessionStorage.removeItem("admin_auth");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
