import { useState } from "react";
import { mockTrainers, Trainer } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, User } from "lucide-react";

const AdminTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers);
  const [editing, setEditing] = useState<Trainer | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", specialization: "", bio: "" });

  const openEdit = (t: Trainer) => {
    setEditing(t);
    setForm({ name: t.name, specialization: t.specialization, bio: t.bio });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm({ name: "", specialization: "", bio: "" }); setOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setTrainers(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
      toast({ title: "প্রশিক্ষক আপডেট হয়েছে" });
    } else {
      setTrainers(prev => [...prev, { id: crypto.randomUUID(), ...form, photo_url: "", is_active: true }]);
      toast({ title: "প্রশিক্ষক যোগ হয়েছে" });
    }
    setOpen(false);
  };

  const toggleActive = (id: string) => {
    setTrainers(prev => prev.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">প্রশিক্ষক ব্যবস্থাপনা</h1>
        <Button onClick={openNew} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-1" /> নতুন প্রশিক্ষক
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {trainers.map(t => (
          <div key={t.id} className={`bg-card border rounded-xl p-5 ${t.is_active ? "border-border" : "border-border opacity-50"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{t.name}</h3>
                <p className="text-xs text-primary">{t.specialization}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{t.bio}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch checked={t.is_active} onCheckedChange={() => toggleActive(t.id)} />
                <span className="text-xs text-muted-foreground">{t.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => openEdit(t)}><Edit className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "প্রশিক্ষক সম্পাদনা" : "নতুন প্রশিক্ষক"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>নাম</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2"><Label>বিশেষত্ব</Label><Input value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} placeholder="যেমন: মাসল বিল্ডিং" /></div>
            <div className="space-y-2"><Label>সংক্ষিপ্ত পরিচিতি</Label><Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} /></div>
            <Button onClick={handleSave} className="w-full bg-gradient-primary text-primary-foreground">সংরক্ষণ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTrainers;
