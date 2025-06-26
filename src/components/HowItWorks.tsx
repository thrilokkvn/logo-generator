import { FileText, Wand, FileImage } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Describe Your Vision",
      description: "Tell us about your business, style preferences, and any specific requirements for your logo.",
      step: "01"
    },
    {
      icon: Wand,
      title: "AI Creates Magic",
      description: "Our advanced AI analyzes your input and generates multiple unique logo concepts in seconds.",
      step: "02"
    },
    {
      icon: FileImage,
      title: "Download & Use",
      description: "Choose your favorite design, customize if needed, and download in multiple high-quality formats.",
      step: "03"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-300 mb-4">
            How It 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating your perfect logo is as simple as 1-2-3. Our streamlined process gets you from idea to finished logo in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">          
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-muted">
              <CardContent className="p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-6 mt-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

