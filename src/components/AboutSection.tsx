import { MapPin, Phone, Shield, Heart, Clock, Bike } from "lucide-react";

const features = [
  { icon: Shield, text: "২৪/৭ সিসিটিভি নিরাপত্তা" },
  { icon: Heart, text: "সকল বয়স ও লিঙ্গের জন্য উন্মুক্ত" },
  { icon: Clock, text: "অটো ডোর অ্যাক্সেস" },
  { icon: Bike, text: "বাইক ও সাইকেল পার্কিং" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-surface-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          আমাদের <span className="text-gradient">সম্পর্কে</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-lg">
          SABBIR FITNESS এমন একটি ফিটনেস সেন্টার যেখানে আমরা বিশ্বাস করি — শরীর গঠন করুন, নিজেকে সুস্থ রাখুন। আমাদের জিম সকল বয়স ও লিঙ্গের মানুষের জন্য উন্মুক্ত। বিশ্বমানের সরঞ্জাম, অভিজ্ঞ প্রশিক্ষক এবং আধুনিক সুবিধা নিয়ে আমরা আপনার ফিটনেস যাত্রার সেরা সঙ্গী।
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f) => (
            <div
              key={f.text}
              className="bg-surface-2 rounded-lg p-6 text-center border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <f.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-foreground font-medium">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="bg-surface-2 rounded-xl p-8 max-w-xl mx-auto border border-border">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <p className="text-foreground">
              ৩৭ নং ওয়ার্ড, খালেদা সুপার মার্কেট (৪র্থ তলা), গাজীপুর
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <p className="text-foreground">
              ০১৯৯৯-৫৯৪৯৪৪ | ০১৬৮১-২৩৪৪৬২
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
