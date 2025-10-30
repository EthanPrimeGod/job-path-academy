import visionImage from "@/assets/vision-abstract.jpg";

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
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Annota Academy is our growing collection of interactive micro-learning modules designed to help annotators gain specialized skills over time.
          </p>
          <p>
            Build expertise through hands-on training, earn micro-credentials, and unlock new opportunities in the evolving world of AI annotation.
          </p>
        </div>

        <div className="mt-12 inline-flex px-8 py-3 rounded-full bg-card/40 backdrop-blur-glass border border-border/50 text-sm text-muted-foreground">
          Coming Soon
        </div>
      </div>
    </section>
  );
};
