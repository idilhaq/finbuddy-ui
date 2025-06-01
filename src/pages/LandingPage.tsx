import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1000 // 1 second
    const stepTime = Math.abs(Math.floor(duration / value))
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === value) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return <p className="text-4xl font-bold">{count}+</p>
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-xl font-bold">FinBuddy</h1>
        <nav className="space-x-4">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#community" className="hover:underline">Community</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#newsletter" className="hover:underline">Newsletter</a>
          <a href="/register">
            <Button>Register</Button>
          </a>
          <a href="/login">
            <Button variant="outline">Login</Button>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Master Your Finances with FinBuddy
        </motion.h2>
        <motion.p 
          className="mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Budget smarter, save more, and join a community of financial achievers.
        </motion.p>
        <a href="/register">
          <Button size="lg">Get Started Free</Button>
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h3 className="text-2xl font-bold mb-8 text-center">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Budget Planning', desc: 'Track monthly income, expenses, and allocate smart budgets.' },
            { title: 'Expense Tracking', desc: 'Log your daily expenses and get instant insights.' },
            { title: 'Savings Goals', desc: 'Set, track, and achieve your personal savings milestones.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {feature.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Stats Section */}
      <section id="community" className="py-16 bg-gray-100 text-center">
        <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
        <p className="mb-8">Thousands of users tracking their financial goals together.</p>
        <div className="flex justify-center space-x-8">
          <div>
            <AnimatedCounter value={5000} />
            <p>Registered Users</p>
          </div>
          <div>
            <AnimatedCounter value={10000} />
            <p>Goals Created</p>
          </div>
          <div>
            <AnimatedCounter value={3500} />
            <p>Goals Achieved</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-8">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah', quote: 'FinBuddy helped me save for my first car in just 8 months!' },
            { name: 'John', quote: 'Finally, a budgeting app that makes sense. Highly recommend!' },
            { name: 'Aisha', quote: 'The community challenges keep me motivated to save more.' },
          ].map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter" className="py-16 px-6 bg-gray-100 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="mb-6">Subscribe to our newsletter for tips, updates, and special offers.</p>
        <form className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
          <Input type="email" placeholder="Your email address" />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Take Control?</h3>
        <p className="mb-6">Start your journey to financial wellness today.</p>
        <a href="/register">
          <Button size="lg" variant="default">Sign Up Free</Button>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FinBuddy. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage
