"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const Hero = () => {
    const router = useRouter();

    return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted pt-20 sm:pt-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Badge className="flex items-center space-x-2 bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-primary/20 md:mt-10">
            <Sparkles className="w-5 h-5 sm:w-4 sm:h-4 text-primary dark:text-yellow-400 font-bold"/>
            <span className="text-xs sm:text-sm text-foreground font-medium">Powered by Advanced AI</span>
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
          Create Stunning
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}AI Logos
          </span>
          <br />
          in Seconds
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your brand vision into professional logos with our cutting-edge AI technology. 
          No design skills required - just describe your idea and watch magic happen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
          <Button onClick={() => router.push("/generate")} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Start Creating Free
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-muted-foreground text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Instant Download</span>
          </div>
        </div>
      </div>
    </section>
    )
}