"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from a CMS or database
const getBlogPost = (id: string) => {
  const posts = {
    "1": {
      id: 1,
      title: "Building Resilient Multi-Cloud Architectures",
      description: "Best practices for designing fault-tolerant systems across AWS, Azure, and GCP.",
      date: "2024-01-15",
      categories: ["AWS", "Azure", "Google Cloud", "Architecture"],
      readTime: "8 min read",
      author: "Cloud Engineer",
      image: "/multi-cloud-architecture-diagram.jpg",
      content: `
        <h2>Introduction</h2>
        <p>In today's cloud-first world, building resilient architectures is crucial for business continuity. Multi-cloud strategies provide redundancy and reduce vendor lock-in, but they also introduce complexity that must be carefully managed.</p>
        
        <h2>Key Principles of Multi-Cloud Architecture</h2>
        <p>When designing multi-cloud systems, several key principles should guide your decisions:</p>
        <ul>
          <li><strong>Redundancy:</strong> Ensure critical services are replicated across multiple cloud providers</li>
          <li><strong>Consistency:</strong> Maintain consistent deployment patterns and configurations</li>
          <li><strong>Monitoring:</strong> Implement comprehensive observability across all cloud environments</li>
          <li><strong>Security:</strong> Apply consistent security policies and access controls</li>
        </ul>

        <h2>Implementation Strategies</h2>
        <p>There are several approaches to implementing multi-cloud architectures:</p>
        
        <h3>1. Active-Active Configuration</h3>
        <p>In this setup, workloads run simultaneously across multiple cloud providers. This provides the highest availability but requires sophisticated load balancing and data synchronization.</p>
        
        <h3>2. Active-Passive Configuration</h3>
        <p>Here, one cloud serves as the primary environment while others act as failover targets. This is simpler to implement but may have longer recovery times.</p>

        <h2>Tools and Technologies</h2>
        <p>Several tools can help manage multi-cloud deployments:</p>
        <ul>
          <li><strong>Terraform:</strong> Infrastructure as Code across multiple providers</li>
          <li><strong>Kubernetes:</strong> Container orchestration with cloud-agnostic deployments</li>
          <li><strong>Istio:</strong> Service mesh for consistent networking and security</li>
          <li><strong>Prometheus:</strong> Unified monitoring across cloud environments</li>
        </ul>

        <h2>Best Practices</h2>
        <p>To ensure success with multi-cloud architectures, follow these best practices:</p>
        <ol>
          <li>Start with a clear strategy and business requirements</li>
          <li>Implement robust CI/CD pipelines for consistent deployments</li>
          <li>Use infrastructure as code for reproducible environments</li>
          <li>Establish comprehensive monitoring and alerting</li>
          <li>Plan for disaster recovery and business continuity</li>
          <li>Regularly test failover procedures</li>
        </ol>

        <h2>Conclusion</h2>
        <p>Multi-cloud architectures offer significant benefits in terms of resilience and flexibility, but they require careful planning and execution. By following the principles and practices outlined in this guide, you can build robust systems that leverage the best of multiple cloud providers while maintaining operational excellence.</p>
      `,
    },
  }

  return posts[id as keyof typeof posts] || null
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-6 text-pretty">{post.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-8">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-border">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href="/blog/2" className="hover:text-primary transition-colors">
                      Kubernetes Security: A Comprehensive Guide
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Deep dive into securing containerized workloads and cluster configurations.
                  </p>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-border">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href="/blog/3" className="hover:text-primary transition-colors">
                      Infrastructure as Code with Terraform
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Advanced Terraform patterns for managing complex cloud infrastructure.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
