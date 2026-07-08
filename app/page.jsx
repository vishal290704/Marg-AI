import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
              <br />
              <span className="text-zinc-300 text-3xl md:text-4xl">
                Built for Your Career Growth
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Everything you need to prepare, improve, and confidently move
              forward in your professional journey.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20"
                >
                  <CardContent className="flex flex-col items-center px-6 py-8 text-center">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition-colors duration-300 group-hover:bg-blue-500/15">
                      {feature.icon}
                    </div>

                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-7 text-zinc-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Section  */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by Career Aspirants
            </h2>

            <p className="mt-4 text-lg text-zinc-400">
              Everything you need to prepare, practice, and grow with
              confidence.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
              <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">
                50+
              </h3>

              <div className="mx-auto my-4 h-px w-12 bg-zinc-800" />

              <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
                Industries Covered
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
              <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">
                1000+
              </h3>

              <div className="mx-auto my-4 h-px w-12 bg-zinc-800" />

              <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
                Interview Questions
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
              <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">
                95%
              </h3>

              <div className="mx-auto my-4 h-px w-12 bg-zinc-800" />

              <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
                Success Rate
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
              <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent">
                24/7
              </h3>

              <div className="mx-auto my-4 h-px w-12 bg-zinc-800" />

              <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
                AI Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section  */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              How It Works
            </h2>

            <p className="mt-4 text-lg leading-8 text-zinc-400">
              Get started in minutes with a simple four-step process designed to
              help you prepare smarter and grow faster.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20"
                >
                  {/* Step Number */}
                  <div className="absolute right-5 top-5 text-5xl font-bold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-700">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-7 text-zinc-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section  */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index} className={"bg-background"}>
                  <CardContent className={"pt-6"}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 shrink-0">
                          <Image
                            width={40}
                            height={40}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-primary">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-muted-foreground italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frequently asked questions section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 ">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answer to common questions about our platform
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible="true" className={"w-full"}>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Ready to accelerate section  */}
      <section className="relative w-full overflow-hidden">
        <div className="gradient relative py-24">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl"></div>

          <div className="relative container mx-auto px-6">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Ready to Accelerate Your Career?
              </h2>

              <p className="max-w-2xl text-lg text-white/85">
                Join thousands of professionals who are advancing their careers
                with AI-powered guidance, personalized roadmaps, and interview
                preparation.
              </p>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 mt-4 animate-bounce shadow-2xl shadow-black/20 hover:scale-105 transition-all duration-300"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
