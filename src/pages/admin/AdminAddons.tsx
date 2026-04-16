import { useState } from "react";
import { mockAddons, Addon } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit } from "lucide-react";

const AdminAddons = () => {
  const [addons, setAddons] = useState<Addon[]>(mockAddons);
  const [editing, setEditing] = useState<Addon | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", price_per_month: 0 });

  const openEdit = (addon: Addon) => {
    setEditing(addon);
    setForm({ name: addon.name, price_per_month: addon.price_per_month });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm({ name: "", price_per_month: 0 }); setOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setAddons(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } : a));
      toast({ title: "আপডেট হয়েছে" });
    } else {
      setAddons(prev => [...prev, { id: Date.now(), ...form, is_visible: true }]);
      toast({ title: "যোগ করা হয়েছে" });
    }
    setOpen(false);
  };

  const toggleVisibility = (id: number) => {
    setAddons(prev => prev.map(a => a.id === id ? { ...a, is_visible: !a.is_visible } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">অ্যাড-অন ব্যবস্থাপনা</h1>
        <Button onClick={openNew} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-1" /> নতুন অ্যাড-অন
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {addons.map(addon => (
          <div key={addon.id} className={`bg-card border rounded-xl p-5 ${addon.is_visible ? "border-border" : "border-border opacity-50"}`}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-foreground">{addon.name}</h3>
              <div className="flex items-center gap-2">
                <Switch checked={addon.is_visible} onCheckedChange={() => toggleVisibility(addon.id)} />
                <Button size="sm" variant="ghost" onClick={() => openEdit(addon)}><Edit className="w-4 h-4" /></Button>
              </div>
            </div>
            <p className="text-xl font-bold text-primary">
              {addon.price_per_month > 0 ? `৳${addon.price_per_month}/মাস` : "প্রশাসক নির্ধারিত"}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "অ্যাড-অন সম্পাদনা" : "নতুন অ্যাড-অন"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>নাম</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2"><Label>মাসিক মূল্য (টাকা)</Label><Input type="number" value={form.price_per_month} onChange={e => setForm(f => ({ ...f, price_per_month: Number(e.target.value) }))} /></div>
            <Button onClick={handleSave} className="w-full bg-gradient-primary text-primary-foreground">সংরক্ষণ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAddons;
