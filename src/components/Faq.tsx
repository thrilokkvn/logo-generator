import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Faq = () => {
  const faqs = [
  {
    question: "How does LogoLumeo work?",
    answer:
      "LogoLumeo leverages advanced AI technology to analyze your business description and design preferences. Based on this input, it generates high-quality, custom logo concepts that align with your brand identity—all within seconds.",
  },
  {
    question: "How many credits are required to generate a logo?",
    answer:
      "Each logo generation requires 5 credits. When you create an account, you'll receive 5 complimentary credits as a welcome gift. After that, your credits will automatically renew every month based on your registration date.",
  },
  {
    question: "How can I get more credits?",
    answer:
      "You'll receive 5 credits as a welcome gift upon account creation. These credits will automatically renew monthly based on your registration date.  Note: Credits will be renewed only if your balance is 0.",
  },
  {
    question: "How long does it take to generate a logo?",
    answer:
      "Logo generation typically takes between 45 to 60 seconds. Our AI ensures a quick turnaround while maintaining professional quality and unique design output.",
  },
];


  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about LogoLumeo.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 cursor-pointer">
                <span className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};