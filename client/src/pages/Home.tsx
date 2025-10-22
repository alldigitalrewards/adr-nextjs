import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Gift, Zap, Shield, Globe, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

const navigation = [
  { label: "Platform", url: "/platform", color: "#4CAF50" },
  { label: "Solutions", url: "/solutions", color: "#F44336" },
  { label: "Rewards", url: "/rewards", color: "#9C27B0" },
  { label: "Pricing", url: "/pricing", color: "#FF9800" },
  { label: "Resources", url: "/resources", color: "#2196F3" },
  { label: "About", url: "/about", color: "#00BCD4" },
  { label: "Contact", url: "/contact", color: "#E91E63" },
];

const features = [
  {
    icon: Gift,
    title: "Reward Offerings",
    description: "Offer valuable rewards and incentives that your customers will love. Seamlessly track progress and integrate with existing technology.",
  },
  {
    icon: Zap,
    title: "Platform Services",
    description: "We handle the fulfillment of your digital rewards, including kit packing, warehousing, shipping, and support.",
  },
  {
    icon: Users,
    title: "Program Support",
    description: "We'll help you implement customized incentive programs and provide round-the-clock support.",
  },
  {
    icon: TrendingUp,
    title: "Reward Fulfillment",
    description: "Support client, customer, and employee reward programs with the click of a mouse using RewardSTACK™.",
  },
  {
    icon: Globe,
    title: "Games & Promotions",
    description: "Make your reward program fun and interactive with games designed to generate leads and reward behavior.",
  },
  {
    icon: Shield,
    title: "Solutions & APIs",
    description: "Integrate compatible technology into a responsive incentive platform using a flexible API.",
  },
];

const solutions = [
  { title: "Employee Recognition", description: "Boost morale and retention with employee recognition programs." },
  { title: "Loyalty Marketing", description: "Drive repeat business with loyalty marketing solutions." },
  { title: "Consumer Promotions", description: "Launch consumer promotions with fast reward fulfillment." },
  { title: "Market Research", description: "Incentivize survey participation and panel engagement." },
  { title: "Sales Incentives", description: "Motivate your sales team with prepaid card SPIFFs." },
  { title: "Channel Sales", description: "Support channel partners with scalable incentive payouts." },
  { title: "Wellness", description: "Enhance wellness programs with health engagement rewards." },
  { title: "Rebates", description: "Streamline rebate payouts with fast, secure fulfillment." },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Engage Customers and Employees with Personalized Rewards and Incentives.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                All Digital Rewards is the secure, powerful API-driven platform enterprises trust to launch US and global 
                incentive programs fast—delivering bulk gift cards, Visa® prepaid cards, and 1 M+ digital options with 
                multicurrency support, robust compliance, and real-time analytics that prove ROI.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  About ADR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Empower Your Business with Next-Gen Reward and Incentive Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                All Digital Rewards make managing your incentive programs easy. We are the leading technology infrastructure 
                to automate rewards, incentives & payouts for employees, customers, and channel partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                      <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium mt-4 inline-flex items-center">
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Employee and Customer Engagement Solutions</h2>
              <p className="text-xl text-blue-100">
                We support B2B, B2C, and B2B2C program redemption scenarios to engage and build lasting relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-blue-100 mb-4">{solution.description}</p>
                  <Link href="#" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Get Started Today!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ready to see how our catalog of products and services can help build your business? 
              Fill out the form and one of our team members will be happy to answer your questions.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Contact Sales
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
