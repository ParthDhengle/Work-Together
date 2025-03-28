import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Users, Calendar, MessageSquare, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Work Together Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-primary">Work Together</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#advantages" className="text-sm font-medium hover:text-primary">
              Why Choose Us
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup" className="hidden sm:block">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-wt-blue-50/30 to-wt-green-50/30 dark:from-wt-blue-950/30 dark:to-wt-green-950/30" />
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-6 animate-fade-up">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Work Smarter, Together
                  <span className="block text-primary">Your Free Teams Alternative</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  A powerful platform for task scheduling, team communication, and productivity—all free, forever.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/download">
                    <Button size="lg" variant="outline">
                      Download Work Together
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl parallax-hero">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful Features for Every Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to collaborate effectively, all in one place.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature Card 1 */}
              <div className="bg-card rounded-xl p-6 shadow-md feature-card">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Task Scheduling</h3>
                <p className="text-muted-foreground">
                  Assign and balance tasks dynamically based on team capacity and priorities.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-card rounded-xl p-6 shadow-md feature-card">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Chat & Calls</h3>
                <p className="text-muted-foreground">
                  Real-time messaging, video conferencing, and screen sharing capabilities.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-card rounded-xl p-6 shadow-md feature-card">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor projects and workloads with real-time status updates and analytics.
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-card rounded-xl p-6 shadow-md feature-card">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">File Sharing</h3>
                <p className="text-muted-foreground">
                  Securely share and collaborate on documents with version history.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Loved by Teams Everywhere</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what our users have to say about Work Together.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-card rounded-xl p-6 shadow-md hover-scale">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Jane" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Best free tool for remote teams! We've improved our productivity by 30% since switching to Work
                  Together."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-card rounded-xl p-6 shadow-md hover-scale">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Mark" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-medium">Mark Johnson</p>
                    <p className="text-sm text-muted-foreground">Team Lead</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The role-specific interfaces make it so easy to manage my team. I can focus on what matters most."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-card rounded-xl p-6 shadow-md hover-scale">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Sarah" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I love how I can see my workload at a glance and communicate with my team all in one place."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="advantages" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform offers unique advantages that set us apart from the competition.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Advantage 1 */}
              <div className="flex flex-col items-center text-center p-4 hover-scale">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free Forever</h3>
                <p className="text-muted-foreground">No hidden costs or premium features locked behind paywalls.</p>
              </div>

              {/* Advantage 2 */}
              <div className="flex flex-col items-center text-center p-4 hover-scale">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Open for Work</h3>
                <p className="text-muted-foreground">
                  Scalable for teams of all sizes, from freelancers to enterprises.
                </p>
              </div>

              {/* Advantage 3 */}
              <div className="flex flex-col items-center text-center p-4 hover-scale">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Task Automation</h3>
                <p className="text-muted-foreground">AI-powered task suggestions and dynamic scheduling.</p>
              </div>

              {/* Advantage 4 */}
              <div className="flex flex-col items-center text-center p-4 hover-scale">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
                <p className="text-muted-foreground">Available on web, desktop, and mobile devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Work Together?</h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Join thousands of teams who are already collaborating more effectively—for free.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/download">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Download Work Together
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Work Together Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="text-xl font-bold text-primary">Work Together</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A powerful platform for task scheduling, team communication, and productivity—all free, forever.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Download
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Work Together. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

