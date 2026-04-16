import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "মাসিক পরিকল্পনা",
    price: "১,২০০",
    period: "মাস",
    admission: "ভর্তি ফি: ১,০০০ টাকা",
    discount: "প্রথম মাসে ভর্তি ফিতে ১০০% ছাড়!",
    features: [
      "সকল জিম সরঞ্জাম ব্যবহার",
      "ফিটনেস প্রোগ্রাম",
      "বাথ ও পরিবর্তন কক্ষ",
      "পার্কিং সুবিধা",
    ],
    popular: false,
    icon: Zap,
  },
  {
    name: "৩ মাসের প্যাকেজ",
    price: "১,৮০০",
    period: "৩ মাস",
    admission: "ভর্তি ফি সহ",
    discount: null,
    features: [
      "সকল জিম সরঞ্জাম ব্যবহার",
      "ফিটনেস প্রোগ্রাম",
      "বাথ ও পরিবর্তন কক্ষ",
      "পার্কিং সুবিধা",
    ],
    popular: true,
    icon: Star,
  },
  {
    name: "৬ মাসের প্যাকেজ",
    price: "৩,৫০০",
    period: "৬ মাস",
    admission: "ভর্তি ফি সহ",
    discount: null,
    features: [
      "সকল জিম সরঞ্জাম ব্যবহার",
      "ফিটনেস প্রোগ্রাম",
      "বাথ ও পরিবর্তন কক্ষ",
      "পার্কিং সুবিধা",
    ],
    popular: false,
    icon: Zap,
  },
  {
    name: "১২ মাসের প্যাকেজ",
    price: "৬,৫০০",
    period: "১২ মাস",
    admission: "ভর্তি ফি সহ",
    discount: null,
    features: [
      "সকল জিম সরঞ্জাম ব্যবহার",
      "ফিটনেস প্রোগ্রাম",
      "বাথ ও পরিবর্তন কক্ষ",
      "পার্কিং সুবিধা",
    ],
    popular: false,
    icon: Zap,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          সদস্যতার <span className="text-gradient">মূল্য তালিকা</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          আপনার প্রয়োজন অনুসারে সেরা পরিকল্পনা বেছে নিন
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-glow bg-surface-2"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary px-4 py-1 rounded-full text-sm font-semibold text-primary-foreground">
                  জনপ্রিয়
                </div>
              )}
              <plan.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-black text-foreground">৳{plan.price}</span>
                <span className="text-muted-foreground text-sm"> / {plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{plan.admission}</p>
              {plan.discount && (
                <p className="text-sm text-primary font-semibold mb-3">{plan.discount}</p>
              )}
              <ul className="space-y-2 mt-4 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#admission">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  নির্বাচন করুন
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-surface-2 rounded-xl p-6 max-w-2xl mx-auto border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 text-center">
            অতিরিক্ত সুবিধা (অ্যাড-অন)
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-3 rounded-lg p-4 border border-border">
              <p className="font-semibold text-foreground">🏃 ট্রেডমিল ব্যবহার</p>
              <p className="text-primary font-bold text-lg">৳২০০ <span className="text-sm text-muted-foreground font-normal">/ মাস</span></p>
            </div>
            <div className="bg-surface-3 rounded-lg p-4 border border-border">
              <p className="font-semibold text-foreground">🔐 লকার সেবা</p>
              <p className="text-primary font-bold text-lg">৳৩০০ <span className="text-sm text-muted-foreground font-normal">/ মাস</span></p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            * ট্রেডমিল ও লকারের ফি প্যাকেজের সাথে আলাদা, প্রতি মাসে দিতে হবে।
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            * ব্যক্তিগত প্রশিক্ষক আলাদা চার্জে পাওয়া যায় (পরিমাণ প্রশাসক সেট করবেন)।
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
