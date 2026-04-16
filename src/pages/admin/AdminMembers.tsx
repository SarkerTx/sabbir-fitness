import { useState } from "react";
import { mockMembers, Member } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: "সক্রিয়", class: "bg-primary/15 text-primary" },
  expired: { label: "মেয়াদোত্তীর্ণ", class: "bg-destructive/15 text-destructive" },
  suspended: { label: "স্থগিত", class: "bg-gold/15 text-gold" },
};

const AdminMembers = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const members = mockMembers.filter(m => {
    const matchSearch = m.full_name.includes(search) || m.phone.includes(search);
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">সদস্য ব্যবস্থাপনা</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="নাম বা ফোন দিয়ে খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
            <SelectItem value="active">সক্রিয়</SelectItem>
            <SelectItem value="expired">মেয়াদোত্তীর্ণ</SelectItem>
            <SelectItem value="suspended">স্থগিত</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-semibold text-foreground">নাম</th>
                <th className="text-left p-3 font-semibold text-foreground">ফোন</th>
                <th className="text-left p-3 font-semibold text-foreground">প্ল্যান</th>
                <th className="text-left p-3 font-semibold text-foreground">মেয়াদ</th>
                <th className="text-left p-3 font-semibold text-foreground">অ্যাড-অন</th>
                <th className="text-left p-3 font-semibold text-foreground">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => {
                const s = statusMap[m.status];
                return (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="p-3 text-foreground font-medium">{m.full_name}</td>
                    <td className="p-3 text-muted-foreground">{m.phone}</td>
                    <td className="p-3 text-foreground">{m.plan_name}</td>
                    <td className="p-3 text-muted-foreground text-xs">{m.start_date} → {m.expiry_date}</td>
                    <td className="p-3">
                      {m.addons.length > 0 ? m.addons.map(a => (
                        <Badge key={a} variant="secondary" className="mr-1 text-xs">{a}</Badge>
                      )) : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${s.class}`}>{s.label}</span>
                    </td>
                  </tr>
                );
              })}
              {members.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">কোনো সদস্য পাওয়া যায়নি।</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers;
