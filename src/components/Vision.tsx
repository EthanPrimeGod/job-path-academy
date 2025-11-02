import visionImage from "@/assets/vision-hive.jpg";

export const Vision = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={visionImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Beyond Jobs
        </h2>
        
        <div className="text-lg text-muted-foreground leading-relaxed mb-12">
          <p>
            Annota Academy is our upcoming platform for interactive micro-learning — helping annotators expand their expertise, earn credentials, and stay competitive.
          </p>
        </div>

        <div className="inline-flex px-8 py-3 rounded-full bg-card/40 backdrop-blur-glass border border-border/50 text-sm text-muted-foreground">
          Coming Soon
        </div>
      </div>
    </section>
  );
};
