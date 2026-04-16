import { Bell, Calendar } from "lucide-react";

const notices = [
  {
    title: "ভর্তি ফিতে ১০০% ছাড়!",
    description: "সীমিত সময়ের জন্য প্রথম মাসের ভর্তি ফিতে ১০০% ছাড়। এখনই ভর্তি হোন!",
    date: "চলমান অফার",
    type: "offer",
  },
  {
    title: "জিমের সময়সূচি",
    description: "সকাল ৬:০০ – রাত ১০:০০ পর্যন্ত। শুক্রবার সকাল ৮:০০ – রাত ১০:০০।",
    date: "নিয়মিত",
    type: "schedule",
  },
  {
    title: "নতুন সরঞ্জাম সংযোজন",
    description: "আমাদের জিমে নতুন আধুনিক সরঞ্জাম যোগ করা হয়েছে। এসে দেখুন!",
    date: "সাম্প্রতিক",
    type: "update",
  },
];

const NoticesSection = () => {
  return (
    <section id="notices" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <Bell className="w-8 h-8 text-primary inline-block mr-2 mb-1" />
          নোটিশ <span className="text-gradient">বোর্ড</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          জিমের সর্বশেষ খবর ও ঘোষণা
        </p>

        <div className="space-y-4 max-w-2xl mx-auto">
          {notices.map((notice) => (
            <div
              key={notice.title}
              className={`bg-card rounded-xl p-6 border transition-colors duration-300 hover:border-primary/40 ${
                notice.type === "offer" ? "border-primary/30" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {notice.type === "offer" && "🔥 "}
                    {notice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{notice.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Calendar className="w-3 h-3" />
                  {notice.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
