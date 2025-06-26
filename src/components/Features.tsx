import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, FileImage, Wand } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional logos in under 30 seconds with our advanced AI algorithms."
    },
    {
      icon: Palette,
      title: "Unlimited Styles",
      description: "From minimalist to complex designs, our AI adapts to any brand aesthetic you envision."
    },
    {
      icon: FileImage,
      title: "High Resolution",
      description: "Download your logos in multiple formats including PNG, SVG, and PDF at print quality."
    },
    {
      icon: Wand,
      title: "Smart Customization",
      description: "Fine-tune colors, fonts, and layouts with intelligent suggestions tailored to your brand."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Logolumeo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of logo design with our intelligent platform that understands your brand vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-muted/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};