import { mockPayments } from "@/data/mockData";
import { CreditCard, TrendingUp, Clock, AlertTriangle } from "lucide-react";

const AdminPayments = () => {
  const completed = mockPayments.filter(p => p.status === "completed");
  const pending = mockPayments.filter(p => p.status === "pending");
  const totalRevenue = completed.reduce((s, p) => s + p.amount, 0);
  const membershipRevenue = completed.filter(p => p.payment_type === "monthly_fee").reduce((s, p) => s + p.amount, 0);
  const addonRevenue = completed.filter(p => p.payment_type.startsWith("addon_")).reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">পেমেন্ট ও রাজস্ব</h1>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">৳{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">মোট আয়</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <CreditCard className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold text-foreground">৳{membershipRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">সদস্যতা ফি</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <CreditCard className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">৳{addonRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">অ্যাড-অন আয়</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <AlertTriangle className="w-5 h-5 text-gold mb-2" />
          <p className="text-2xl font-bold text-foreground">{pending.length}</p>
          <p className="text-xs text-muted-foreground">মুলতুবি পেমেন্ট</p>
        </div>
      </div>

      {/* Payment Log */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-foreground">পেমেন্ট লগ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-semibold text-foreground">সদস্য</th>
                <th className="text-left p-3 font-semibold text-foreground">পরিমাণ</th>
                <th className="text-left p-3 font-semibold text-foreground">ধরন</th>
                <th className="text-left p-3 font-semibold text-foreground">পদ্ধতি</th>
                <th className="text-left p-3 font-semibold text-foreground">স্ট্যাটাস</th>
                <th className="text-left p-3 font-semibold text-foreground">তারিখ</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map(p => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-3 text-foreground font-medium">{p.member_name}</td>
                  <td className="p-3 text-foreground font-semibold">৳{p.amount}</td>
                  <td className="p-3 text-muted-foreground">{p.payment_type}</td>
                  <td className="p-3 text-muted-foreground">{p.payment_method}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      p.status === "completed" ? "bg-primary/15 text-primary" : "bg-gold/15 text-gold"
                    }`}>{p.status === "completed" ? "সম্পন্ন" : "মুলতুবি"}</span>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(p.paid_at).toLocaleDateString("bn-BD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
