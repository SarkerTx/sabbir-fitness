import { useState } from "react";
import { mockNotices, Notice } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Archive } from "lucide-react";

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", content: "", expires_on: "" });

  const openEdit = (n: Notice) => {
    setEditing(n);
    setForm({ title: n.title, content: n.content, expires_on: n.expires_on || "" });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm({ title: "", content: "", expires_on: "" }); setOpen(true); };

  const handleSave = () => {
    if (!form.title || !form.content) return;
    if (editing) {
      setNotices(prev => prev.map(n => n.id === editing.id ? { ...n, ...form, expires_on: form.expires_on || null } : n));
      toast({ title: "নোটিশ আপডেট হয়েছে" });
    } else {
      const newNotice: Notice = {
        id: crypto.randomUUID(), ...form, expires_on: form.expires_on || null,
        published_from: new Date().toISOString().split("T")[0], is_archived: false,
      };
      setNotices(prev => [newNotice, ...prev]);
      toast({ title: "নোটিশ প্রকাশিত হয়েছে" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    toast({ title: "নোটিশ মুছে ফেলা হয়েছে", variant: "destructive" });
  };

  const handleArchive = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, is_archived: !n.is_archived } : n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">নোটিশ ব্যবস্থাপনা</h1>
        <Button onClick={openNew} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-1" /> নতুন নোটিশ
        </Button>
      </div>

      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className={`bg-card border border-border rounded-xl p-4 ${n.is_archived ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{n.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  প্রকাশ: {n.published_from} {n.expires_on && `• মেয়াদ: ${n.expires_on}`}
                  {n.is_archived && " • 📁 আর্কাইভ"}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => openEdit(n)}><Edit className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleArchive(n.id)}><Archive className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(n.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>শিরোনাম</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><Label>বিষয়বস্তু</Label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
            <div className="space-y-2"><Label>মেয়াদ শেষ (ঐচ্ছিক)</Label><Input type="date" value={form.expires_on} onChange={e => setForm(f => ({ ...f, expires_on: e.target.value }))} /></div>
            <Button onClick={handleSave} className="w-full bg-gradient-primary text-primary-foreground">সংরক্ষণ করুন</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNotices;
