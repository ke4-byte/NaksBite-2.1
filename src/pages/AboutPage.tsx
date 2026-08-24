import { Flame, Heart, Leaf, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Our Story</h1>
          <p className="text-red-100">From a small kitchen in Nairobi to your doorstep</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-black mb-4">Born in Nairobi, Made for You</h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              NaksBite started in 2020 with a simple mission: to bring world-class burgers to Nairobi. 
              What began as a small food truck in Westlands has grown into one of the city's most loved 
              burger brands.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              We source the finest Kenyan beef, bake our buns fresh daily, and craft every burger 
              with passion. Our secret? It's not just about the food — it's about the experience.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Today, we're proud to serve thousands of happy customers across Nairobi, and we're 
              just getting started.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop"
              alt="NaksBite story"
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-black">4+</p>
              <p className="text-sm">Years of flavor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Flame, title: "Our Passion", desc: "Every burger is crafted with love and attention to detail" },
            { icon: Leaf, title: "Fresh Ingredients", desc: "Daily-sourced produce and premium Kenyan beef" },
            { icon: Users, title: "Community First", desc: "Supporting local farmers and businesses" },
            { icon: Heart, title: "Made with Love", desc: "Recipes perfected over years of dedication" },
          ].map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-red-100 dark:bg-red-950 rounded-xl inline-block mb-4">
                  <value.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-black text-center mb-8">Our Commitment</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-bold text-red-600 mb-2">Quality</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                100% halal-certified beef, fresh vegetables, and premium ingredients in every bite.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-red-600 mb-2">Speed</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Average delivery time of 30 minutes across Nairobi. Hot, fresh, and on time.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-red-600 mb-2">Value</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Premium burgers at prices that make sense. Great food shouldn't break the bank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}