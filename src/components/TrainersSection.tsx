import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";

const trainers = [
  {
    name: "রাকিব হোসেন",
    specialty: "ওজন কমানো ও কার্ডিও",
    image: trainer1,
  },
  {
    name: "তানভীর আহমেদ",
    specialty: "মাসল বিল্ডিং ও স্ট্রেংথ",
    image: trainer2,
  },
  {
    name: "ফারিয়া ইসলাম",
    specialty: "যোগব্যায়াম ও ফিটনেস",
    image: trainer3,
  },
];

const TrainersSection = () => {
  return (
    <section id="trainers" className="py-20 bg-surface-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          আমাদের <span className="text-gradient">প্রশিক্ষকবৃন্দ</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          অভিজ্ঞ ও প্রশিক্ষিত প্রশিক্ষকদের সাথে আপনার ফিটনেস লক্ষ্য পূরণ করুন
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={512}
                  height={640}
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">{trainer.name}</h3>
                <p className="text-primary font-medium text-sm">{trainer.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
