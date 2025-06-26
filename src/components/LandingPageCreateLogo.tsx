import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "./ui/button"

export const LandingPageCreateLogo = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-muted relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Ready to Create Your 
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}Dream Logo?
          </span>
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of businesses who've already transformed their brand with LogoForge AI. 
          Start your free trial today and see the difference professional AI design can make.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <p className="text-muted-foreground text-sm">
          • No credit card required
        </p>
      </div>
    </section>
    )
}