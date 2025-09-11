"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Star,
  GitFork,
  Calendar,
  Download,
  Play,
  FileText,
  Code,
  Settings,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from a CMS or database
const getProject = (id: string) => {
  const projects = {
    "1": {
      id: 1,
      title: "Multi-Cloud Infrastructure Automation",
      description:
        "Terraform-based infrastructure as code solution supporting AWS, Azure, and GCP with automated CI/CD pipelines.",
      longDescription:
        "A comprehensive infrastructure automation platform that enables seamless deployment across multiple cloud providers. Features include automated resource provisioning, cost optimization, security compliance checking, and disaster recovery orchestration.",
      technologies: ["Terraform", "AWS", "Azure", "GCP", "Jenkins", "Docker", "Python"],
      categories: ["Infrastructure", "DevOps", "Multi-Cloud"],
      githubUrl: "https://github.com/yourusername/multi-cloud-infra",
      liveUrl: "https://multi-cloud-demo.vercel.app",
      image: "/multi-cloud-project-screenshot.jpg",
      status: "Production",
      stars: 245,
      forks: 67,
      lastUpdated: "2024-01-15",
      documentation: {
        overview: `
          <h3>Project Overview</h3>
          <p>This multi-cloud infrastructure automation platform provides a unified approach to managing resources across AWS, Azure, and Google Cloud Platform. Built with Terraform and integrated with Jenkins for continuous deployment.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Cross-cloud resource provisioning</li>
            <li>Automated cost optimization</li>
            <li>Security compliance monitoring</li>
            <li>Disaster recovery orchestration</li>
            <li>Real-time infrastructure monitoring</li>
          </ul>
        `,
        setup: `
          <h3>Prerequisites</h3>
          <ul>
            <li>Terraform >= 1.0</li>
            <li>AWS CLI configured</li>
            <li>Azure CLI configured</li>
            <li>Google Cloud SDK configured</li>
          </ul>
          
          <h3>Installation</h3>
          <pre><code>git clone https://github.com/yourusername/multi-cloud-infra.git
cd multi-cloud-infra
terraform init
terraform plan
terraform apply</code></pre>
        `,
        usage: `
          <h3>Basic Usage</h3>
          <p>Configure your cloud provider credentials and customize the variables.tf file according to your requirements.</p>
          
          <h3>Configuration</h3>
          <pre><code># variables.tf
variable "aws_region" {
  description = "AWS region"
  default     = "us-west-2"
}

variable "azure_location" {
  description = "Azure location"
  default     = "West US 2"
}

variable "gcp_region" {
  description = "GCP region"
  default     = "us-west1"
}</code></pre>
        `,
        architecture: `
          <h3>System Architecture</h3>
          <p>The system follows a modular architecture with separate modules for each cloud provider, enabling independent scaling and management.</p>
          
          <h3>Components</h3>
          <ul>
            <li><strong>Core Module:</strong> Shared resources and configurations</li>
            <li><strong>AWS Module:</strong> AWS-specific resources and services</li>
            <li><strong>Azure Module:</strong> Azure-specific resources and services</li>
            <li><strong>GCP Module:</strong> Google Cloud-specific resources and services</li>
            <li><strong>Monitoring Module:</strong> Cross-cloud monitoring and alerting</li>
          </ul>
        `,
      },
    },
  }

  return projects[id as keyof typeof projects] || null
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production":
        return "bg-green-500"
      case "Beta":
        return "bg-yellow-500"
      case "Development":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {project.forks}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-6 text-pretty">{project.longDescription}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Documentation */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="setup" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Setup
                </TabsTrigger>
                <TabsTrigger value="usage" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Usage
                </TabsTrigger>
                <TabsTrigger value="architecture" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Architecture
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
                      dangerouslySetInnerHTML={{ __html: project.documentation.overview }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="setup" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Installation & Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
                      dangerouslySetInnerHTML={{ __html: project.documentation.setup }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
                      dangerouslySetInnerHTML={{ __html: project.documentation.usage }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="architecture" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>System Architecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
                      dangerouslySetInnerHTML={{ __html: project.documentation.architecture }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-8">Related Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-border">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href="/projects/2" className="hover:text-primary transition-colors">
                      Kubernetes Monitoring Stack
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Complete observability solution using Prometheus, Grafana, and ELK stack.
                  </p>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-border">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href="/projects/4" className="hover:text-primary transition-colors">
                      Cloud Security Automation
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Automated security compliance checking and remediation across cloud environments.
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
