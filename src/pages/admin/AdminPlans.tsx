import { useState } from "react";
import { mockPlans, Plan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit } from "lucide-react";

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", duration_months: 1, price: 0, admission_fee_waived: false });

  const openEdit = (plan: Plan) => {
    setEditing(plan);
    setForm({ name: plan.name, duration_months: plan.duration_months, price: plan.price, admission_fee_waived: plan.admission_fee_waived });
    setOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", duration_months: 1, price: 0, admission_fee_waived: false });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setPlans(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
      toast({ title: "আপডেট হয়েছে", description: `${form.name} প্ল্যান আপডেট করা হয়েছে।` });
    } else {
      const newPlan: Plan = { id: Date.now(), ...form, is_visible: true };
      setPlans(prev => [...prev, newPlan]);
      toast({ title: "যোগ করা হয়েছে", description: `${form.name} প্ল্যান যোগ করা হয়েছে।` });
    }
    setOpen(false);
  };

  const toggleVisibility = (id: number) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, is_visible: !p.is_visible } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">প্ল্যান ও মূল্য ব্যবস্থাপনা</h1>
        <Button onClick={openNew} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-1" /> নতুন প্ল্যান
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-card border rounded-xl p-5 ${plan.is_visible ? "border-border" : "border-border opacity-50"}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.duration_months} মাস</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={plan.is_visible} onCheckedChange={() => toggleVisibility(plan.id)} />
                <Button size="sm" variant="ghost" onClick={() => openEdit(plan)}><Edit className="w-4 h-4" /></Button>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">৳{plan.price.toLocaleString()}</p>
            {plan.admission_fee_waived && <p className="text-xs text-accent mt-1">ভর্তি ফিতে ছাড় প্রযোজ্য</p>}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "প্ল্যান সম্পাদনা" : "নতুন প্ল্যান"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>নাম</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="যেমন: ৩ মাস" />
            </div>
            <div className="space-y-2">
              <Label>মেয়াদ (মাস)</Label>
              <Input type="number" value={form.duration_months} onChange={e => setForm(f => ({ ...f, duration_months: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>মূল্য (টাকা)</Label>
              <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.admission_fee_waived} onCheckedChange={v => setForm(f => ({ ...f, admission_fee_waived: v }))} />
              <Label>ভর্তি ফি ছাড়</Label>
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-primary text-primary-foreground">সংরক্ষণ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPlans;
