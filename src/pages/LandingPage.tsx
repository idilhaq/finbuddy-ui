import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(10, Math.floor(duration / value));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <p className="text-4xl font-bold">{count}+</p>;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <header className="flex justify-between items-center p-6 bg-white/80 shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-indigo-700">FinBuddy</h1>
        <nav className="space-x-4">
          <a href="#highlight" className="hover:underline text-indigo-600 font-medium">Highlights</a>
          <a href="#features" className="hover:underline text-indigo-600 font-medium">Features</a>
          <a href="#community" className="hover:underline text-indigo-600 font-medium">Community</a>
          <a href="#newsletter" className="hover:underline text-indigo-600 font-medium">Newsletter</a>
          <a href="/register">
            <Button>Register</Button>
          </a>
          <a href="/login">
            <Button variant="outline">Login</Button>
          </a>
        </nav>
      </header>

      {/* Highlight Section */}
      <section
        id="highlight"
        className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      >
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h2
            className="text-5xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Take Charge of Your Financial Future
          </motion.h2>
          <motion.p
            className="mb-8 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            FinBuddy helps you budget, save, and grow—smarter and together.
          </motion.p>
          <a href="/register">
            <Button size="lg" className="bg-white text-indigo-700 font-bold hover:bg-indigo-100">
              Get Started Free
            </Button>
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/assets/finance-illustration.svg"
            alt="Finance Illustration"
            className="w-72 md:w-96 drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h3 className="text-3xl font-bold mb-10 text-center text-indigo-700">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Budget Planning",
              desc: "Track income, expenses, and set smart budgets with ease.",
              icon: "💡",
            },
            {
              title: "Expense Tracking",
              desc: "Log daily expenses and get instant, actionable insights.",
              icon: "📊",
            },
            {
              title: "Savings Goals",
              desc: "Set, track, and achieve your personal savings milestones.",
              icon: "🎯",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-xl shadow-lg hover:shadow-2xl transition">
                <CardHeader className="flex flex-col items-center">
                  <span className="text-5xl mb-2">{feature.icon}</span>
                  <CardTitle className="text-indigo-700">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">{feature.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Stats Section */}
      <section id="community" className="py-16 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-center">
        <h3 className="text-3xl font-bold mb-4 text-indigo-700">Our Community</h3>
        <p className="mb-10 text-lg text-gray-700">Join thousands of users achieving their financial goals together.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div>
            <AnimatedCounter value={5000} />
            <p className="font-medium text-indigo-700">Registered Users</p>
          </div>
          <div>
            <AnimatedCounter value={12000} />
            <p className="font-medium text-indigo-700">Goals Created</p>
          </div>
          <div>
            <AnimatedCounter value={4000} />
            <p className="font-medium text-indigo-700">Goals Achieved</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-10 text-indigo-700">What Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah",
              quote: "FinBuddy helped me save for my first car in just 8 months!",
            },
            {
              name: "John",
              quote: "Finally, a budgeting app that makes sense. Highly recommend!",
            },
            {
              name: "Aisha",
              quote: "The community challenges keep me motivated to save more.",
            },
          ].map((testimonial, i) => (
            <Card key={i} className="rounded-xl shadow-md bg-white/80">
              <CardContent className="p-8">
                <p className="italic text-gray-700">"{testimonial.quote}"</p>
                <p className="mt-6 font-semibold text-indigo-700">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter" className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-center">
        <h3 className="text-3xl font-bold mb-4 text-indigo-700">Stay Updated</h3>
        <p className="mb-8 text-gray-700">Subscribe for tips, updates, and special offers.</p>
        <form className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
          <Input type="email" placeholder="Your email address" />
          <Button type="submit" className="bg-indigo-600 text-white font-bold hover:bg-indigo-700">
            Subscribe
          </Button>
        </form>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Take Control?</h3>
        <p className="mb-8 text-lg">Start your journey to financial wellness today.</p>
        <a href="/register">
          <Button size="lg" variant="default" className="bg-white text-purple-700 font-bold hover:bg-purple-100">
            Sign Up Free
          </Button>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FinBuddy. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
