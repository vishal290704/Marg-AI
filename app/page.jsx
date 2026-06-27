import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { features } from "@/data/features";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2>Powerful Features for Your Career Growth</h2>
          <div>
            {features.map((feature, index) => {
              return (
                <Card key={index}> 
                  <CardContent>
                    <div>
                      {feature.icon}
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
