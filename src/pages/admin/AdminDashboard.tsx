import { Users, UserPlus, CreditCard, TrendingUp, AlertTriangle } from "lucide-react";
import { mockMembers, mockApplicants, mockPayments } from "@/data/mockData";

const AdminDashboard = () => {
  const activeMembers = mockMembers.filter(m => m.status === "active").length;
  const pendingApps = mockApplicants.filter(a => a.status === "pending").length;
  const expiredMembers = mockMembers.filter(m => m.status === "expired").length;
  const totalRevenue = mockPayments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);

  const stats = [
    { label: "সক্রিয় সদস্য", value: activeMembers, icon: Users, color: "text-primary" },
    { label: "মুলতুবি আবেদন", value: pendingApps, icon: UserPlus, color: "text-accent" },
    { label: "মেয়াদোত্তীর্ণ", value: expiredMembers, icon: AlertTriangle, color: "text-destructive" },
    { label: "মোট আয় (৳)", value: `৳${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
  ];

  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" /> সাম্প্রতিক পেমেন্ট
          </h3>
          <div className="space-y-3">
            {recentPayments.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-foreground font-medium">{p.member_name}</p>
                  <p className="text-xs text-muted-foreground">{p.payment_method} • {p.payment_type}</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground font-semibold">৳{p.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    p.status === "completed" ? "bg-primary/15 text-primary" : "bg-gold/15 text-gold"
                  }`}>{p.status === "completed" ? "সম্পন্ন" : "মুলতুবি"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Applicants */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-accent" /> মুলতুবি আবেদন
          </h3>
          <div className="space-y-3">
            {mockApplicants.filter(a => a.status === "pending").map(a => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-foreground font-medium">{a.full_name}</p>
                  <p className="text-xs text-muted-foreground">{a.phone} • {a.gender}</p>
                </div>
                <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-full">মুলতুবি</span>
              </div>
            ))}
            {pendingApps === 0 && <p className="text-sm text-muted-foreground">কোনো মুলতুবি আবেদন নেই।</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
