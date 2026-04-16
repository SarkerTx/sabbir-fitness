import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    gym_name: "SABBIR FITNESS",
    tagline: "শরীর গঠন করুন, নিজেকে সুস্থ রাখুন",
    address: "৩৭ নং ওয়ার্ড, খালেদা সুপার মার্কেট (৪র্থ তলা), গাজীপুর",
    phone_1: "01999-594944",
    phone_2: "01681-234462",
    admission_fee: "1000",
    first_month_discount: "100",
    promotion_active: true,
    personal_trainer_fee: "0",
  });

  const handleSave = () => {
    toast({ title: "সেটিংস সংরক্ষিত হয়েছে ✅" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">জিম সেটিংস</h1>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="font-bold text-foreground text-lg">সাধারণ তথ্য</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>জিমের নাম</Label>
            <Input value={settings.gym_name} onChange={e => setSettings(s => ({ ...s, gym_name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>ট্যাগলাইন</Label>
            <Input value={settings.tagline} onChange={e => setSettings(s => ({ ...s, tagline: e.target.value }))} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>ঠিকানা</Label>
          <Input value={settings.address} onChange={e => setSettings(s => ({ ...s, address: e.target.value }))} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>ফোন নম্বর ১</Label>
            <Input value={settings.phone_1} onChange={e => setSettings(s => ({ ...s, phone_1: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>ফোন নম্বর ২</Label>
            <Input value={settings.phone_2} onChange={e => setSettings(s => ({ ...s, phone_2: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="font-bold text-foreground text-lg">ফি ও প্রচার</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>ভর্তি ফি (টাকা)</Label>
            <Input type="number" value={settings.admission_fee} onChange={e => setSettings(s => ({ ...s, admission_fee: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>প্রথম মাসে ছাড় (%)</Label>
            <Input type="number" value={settings.first_month_discount} onChange={e => setSettings(s => ({ ...s, first_month_discount: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>ব্যক্তিগত প্রশিক্ষক ফি (টাকা/মাস)</Label>
            <Input type="number" value={settings.personal_trainer_fee} onChange={e => setSettings(s => ({ ...s, personal_trainer_fee: e.target.value }))} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Switch checked={settings.promotion_active} onCheckedChange={v => setSettings(s => ({ ...s, promotion_active: v }))} />
            <Label>প্রচার সক্রিয়</Label>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
        <Save className="w-4 h-4 mr-1" /> সেটিংস সংরক্ষণ করুন
      </Button>
    </div>
  );
};

export default AdminSettings;
