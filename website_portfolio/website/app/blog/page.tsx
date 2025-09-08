"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, Filter, Clock } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const blogPosts = [
    {
      id: 1,
      title: "Building Resilient Multi-Cloud Architectures",
      description:
        "Best practices for designing fault-tolerant systems across AWS, Azure, and GCP. Learn how to implement redundancy, failover mechanisms, and disaster recovery strategies.",
      content: "In today's cloud-first world, building resilient architectures is crucial for business continuity...",
      date: "2024-01-15",
      categories: ["AWS", "Azure", "Google Cloud", "Architecture"],
      readTime: "8 min read",
      author: "Cloud Engineer",
      image: "/multi-cloud-architecture-diagram.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Kubernetes Security: A Comprehensive Guide",
      description:
        "Deep dive into securing containerized workloads and cluster configurations. Explore RBAC, network policies, and security best practices.",
      content: "Container security is a multi-layered approach that requires attention to detail...",
      date: "2024-01-08",
      categories: ["Kubernetes", "Security", "DevOps"],
      readTime: "12 min read",
      author: "Cloud Engineer",
      image: "/kubernetes-security-dashboard.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Infrastructure as Code with Terraform",
      description:
        "Advanced Terraform patterns for managing complex cloud infrastructure. Learn about modules, state management, and CI/CD integration.",
      content: "Terraform has revolutionized how we manage infrastructure...",
      date: "2024-01-01",
      categories: ["Terraform", "AWS", "Azure", "IaC"],
      readTime: "10 min read",
      author: "Cloud Engineer",
      image: "/terraform-infrastructure-code.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "Monitoring Microservices with Prometheus",
      description:
        "Setting up comprehensive observability for distributed systems. Implement metrics, alerting, and visualization for microservices.",
      content: "Observability is key to understanding distributed systems...",
      date: "2023-12-20",
      categories: ["Prometheus", "Kubernetes", "Monitoring"],
      readTime: "6 min read",
      author: "Cloud Engineer",
      image: "/prometheus-monitoring-dashboard.jpg",
      featured: false,
    },
    {
      id: 5,
      title: "Serverless Architecture Patterns",
      description:
        "Exploring serverless design patterns and best practices. Learn when and how to implement serverless solutions effectively.",
      content: "Serverless computing has changed how we think about application architecture...",
      date: "2023-12-10",
      categories: ["AWS", "Serverless", "Lambda"],
      readTime: "9 min read",
      author: "Cloud Engineer",
      image: "/serverless-architecture-diagram.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "CI/CD Pipeline Optimization",
      description:
        "Strategies for building faster, more reliable deployment pipelines. Optimize your CI/CD workflows for better developer experience.",
      content: "Continuous integration and deployment are fundamental to modern software development...",
      date: "2023-11-25",
      categories: ["Jenkins", "DevOps", "CI/CD"],
      readTime: "7 min read",
      author: "Cloud Engineer",
      image: "/ci-cd-pipeline-visualization.jpg",
      featured: false,
    },
  ]

  const categories = ["All", ...Array.from(new Set(blogPosts.flatMap((post) => post.categories)))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Technical Blog</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Insights, tutorials, and deep dives into cloud engineering, DevOps, and modern infrastructure practices.
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Featured Posts</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-card-foreground hover:text-primary transition-colors">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/blog/${post.id}`}>Read More</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            All Posts
            <span className="text-lg font-normal text-muted-foreground ml-2">
              ({filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"})
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blog posts found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {regularPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-40">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-card-foreground hover:text-primary transition-colors line-clamp-2">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {post.categories.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.categories.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <a href={`/blog/${post.id}`}>Read More</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest insights on cloud engineering and DevOps delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
