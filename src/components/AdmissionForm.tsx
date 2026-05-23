import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdmissionForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    plan: "",
    treadmill: false,
    locker: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (field: "phone" | "emergencyContact", value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  const isValidBdPhone = (num: string) => /^01[3-9]\d{8}$/.test(num);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.plan) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }
    if (!isValidBdPhone(form.phone)) {
      toast({
        title: "ভুল মোবাইল নম্বর",
        description: "অনুগ্রহ করে ১১ ডিজিটের সঠিক বাংলাদেশি নম্বর দিন (যেমন: ০১XXXXXXXXX)।",
        variant: "destructive",
      });
      return;
    }
    if (form.emergencyContact && !isValidBdPhone(form.emergencyContact)) {
      toast({
        title: "ভুল জরুরি যোগাযোগ নম্বর",
        description: "জরুরি যোগাযোগের নম্বরটি ১১ ডিজিটের সঠিক বাংলাদেশি নম্বর হতে হবে।",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast({
      title: "সফল!",
      description: "আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
    });
    setForm({
      fullName: "", age: "", gender: "", phone: "", email: "",
      address: "", emergencyContact: "", plan: "", treadmill: false, locker: false,
    });
  };

  return (
    <section id="admission" className="py-20 bg-surface-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          ভর্তির <span className="text-gradient">আবেদন</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          নিচের ফর্মটি পূরণ করে আজই আপনার ফিটনেস যাত্রা শুরু করুন
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card rounded-xl p-8 border border-border shadow-card"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">পূর্ণ নাম *</Label>
              <Input
                id="fullName"
                placeholder="আপনার পূর্ণ নাম"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">বয়স</Label>
              <Input
                id="age"
                type="number"
                placeholder="যেমন: ২৫"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>লিঙ্গ</Label>
              <Select value={form.gender} onValueChange={(v) => handleChange("gender", v)}>
                <SelectTrigger><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">পুরুষ</SelectItem>
                  <SelectItem value="female">মহিলা</SelectItem>
                  <SelectItem value="other">অন্যান্য</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">মোবাইল নম্বর *</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="০১XXXXXXXXX"
                value={form.phone}
                onChange={(e) => handlePhoneChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">জরুরি যোগাযোগ</Label>
              <Input
                id="emergencyContact"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="০১XXXXXXXXX"
                value={form.emergencyContact}
                onChange={(e) => handlePhoneChange("emergencyContact", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <Label htmlFor="address">ঠিকানা</Label>
            <Input
              id="address"
              placeholder="আপনার ঠিকানা"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* Plan selection */}
          <div className="space-y-2 mt-5">
            <Label>সদস্যতার পরিকল্পনা *</Label>
            <Select value={form.plan} onValueChange={(v) => handleChange("plan", v)}>
              <SelectTrigger><SelectValue placeholder="পরিকল্পনা নির্বাচন করুন" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">মাসিক – ১,২০০ টাকা</SelectItem>
                <SelectItem value="3months">৩ মাস – ১,৮০০ টাকা (ভর্তি ফি সহ)</SelectItem>
                <SelectItem value="6months">৬ মাস – ৩,৫০০ টাকা (ভর্তি ফি সহ)</SelectItem>
                <SelectItem value="12months">১২ মাস – ৬,৫০০ টাকা (ভর্তি ফি সহ)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add-ons */}
          <div className="mt-6 space-y-3">
            <Label className="text-base">অতিরিক্ত সুবিধা (ঐচ্ছিক)</Label>
            <div className="flex items-center gap-3">
              <Checkbox
                id="treadmill"
                checked={form.treadmill}
                onCheckedChange={(v) => handleChange("treadmill", !!v)}
              />
              <Label htmlFor="treadmill" className="font-normal cursor-pointer">
                ট্রেডমিল অ্যাক্সেস (২০০ টাকা/মাস)
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="locker"
                checked={form.locker}
                onCheckedChange={(v) => handleChange("locker", !!v)}
              />
              <Label htmlFor="locker" className="font-normal cursor-pointer">
                লকার সেবা (৩০০ টাকা/মাস)
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-primary text-primary-foreground text-lg py-6 rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            {loading ? "জমা হচ্ছে..." : "ভর্তির আবেদন জমা দিন"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;
