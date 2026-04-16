import { useState } from "react";
import { mockApplicants, getPlanName, Applicant } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const { toast } = useToast();

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: action, processed_at: new Date().toISOString() } as Applicant : a));
    toast({
      title: action === "approved" ? "অনুমোদিত ✅" : "প্রত্যাখ্যাত ❌",
      description: `আবেদনকারীকে ${action === "approved" ? "অনুমোদন" : "প্রত্যাখ্যান"} করা হয়েছে।`,
    });
  };

  const pending = applicants.filter(a => a.status === "pending");
  const processed = applicants.filter(a => a.status !== "pending");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">আবেদনকারী ব্যবস্থাপনা</h1>

      {/* Pending */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">মুলতুবি আবেদন ({pending.length})</h2>
        {pending.length === 0 && <p className="text-muted-foreground text-sm">কোনো মুলতুবি আবেদন নেই।</p>}
        <div className="space-y-3">
          {pending.map(a => (
            <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{a.full_name}</p>
                <p className="text-sm text-muted-foreground">
                  {a.phone} • {a.gender} • বয়স: {a.age} • প্ল্যান: {getPlanName(a.selected_plan_id)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {a.wants_treadmill && "🏃 ট্রেডমিল "}{a.wants_locker && "🔐 লকার"}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={() => handleAction(a.id, "approved")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Check className="w-4 h-4 mr-1" /> অনুমোদন
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleAction(a.id, "rejected")}>
                  <X className="w-4 h-4 mr-1" /> প্রত্যাখ্যান
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processed */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">প্রক্রিয়াকৃত ({processed.length})</h2>
        <div className="space-y-2">
          {processed.map(a => (
            <div key={a.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between text-sm">
              <div>
                <span className="text-foreground font-medium">{a.full_name}</span>
                <span className="text-muted-foreground ml-2">{a.phone}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                a.status === "approved" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
              }`}>{a.status === "approved" ? "অনুমোদিত" : "প্রত্যাখ্যাত"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>আবেদনকারীর বিবরণ</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p><strong>নাম:</strong> {selected.full_name}</p>
              <p><strong>বয়স:</strong> {selected.age}</p>
              <p><strong>লিঙ্গ:</strong> {selected.gender}</p>
              <p><strong>ফোন:</strong> {selected.phone}</p>
              <p><strong>ইমেইল:</strong> {selected.email}</p>
              <p><strong>ঠিকানা:</strong> {selected.address}</p>
              <p><strong>জরুরি যোগাযোগ:</strong> {selected.emergency_contact}</p>
              <p><strong>প্ল্যান:</strong> {getPlanName(selected.selected_plan_id)}</p>
              <p><strong>ট্রেডমিল:</strong> {selected.wants_treadmill ? "হ্যাঁ" : "না"}</p>
              <p><strong>লকার:</strong> {selected.wants_locker ? "হ্যাঁ" : "না"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplicants;
