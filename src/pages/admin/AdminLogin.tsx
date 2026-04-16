import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      toast({ title: "লগইন ব্যর্থ", description: "ইমেইল বা পাসওয়ার্ড ভুল।", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border p-8 shadow-card">
        <div className="text-center mb-8">
          <img src={logo} alt="SABBIR FITNESS" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">অ্যাডমিন লগইন</h1>
          <p className="text-sm text-muted-foreground mt-1">SABBIR FITNESS ম্যানেজমেন্ট প্যানেল</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">ইমেইল</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email" type="email" placeholder="admin@sabbirfitness.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
            {loading ? "প্রবেশ করা হচ্ছে..." : "প্রবেশ করুন"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          ডেমো: admin@sabbirfitness.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
