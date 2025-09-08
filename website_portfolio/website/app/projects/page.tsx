"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, ExternalLink, Search, Filter, Star, GitFork, FileText, Play } from "lucide-react"
import Image from "next/image"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const projects = [
    {
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
      featured: true,
      documentation: {
        setup: "Clone the repository and run `terraform init` to initialize the project.",
        usage: "Configure your cloud provider credentials and run `terraform plan` to preview changes.",
        architecture: "The system uses a modular approach with separate modules for each cloud provider.",
      },
    },
    {
      id: 2,
      title: "Kubernetes Monitoring Stack",
      description:
        "Complete observability solution using Prometheus, Grafana, and ELK stack for containerized applications.",
      longDescription:
        "A production-ready monitoring and observability platform for Kubernetes clusters. Includes custom dashboards, alerting rules, log aggregation, and performance metrics collection with automated scaling capabilities.",
      technologies: ["Kubernetes", "Prometheus", "Grafana", "ELK", "Helm", "Go", "YAML"],
      categories: ["Monitoring", "Kubernetes", "DevOps"],
      githubUrl: "https://github.com/yourusername/k8s-monitoring",
      liveUrl: "https://k8s-monitoring-demo.vercel.app",
      image: "/kubernetes-monitoring-project.jpg",
      status: "Production",
      stars: 189,
      forks: 43,
      lastUpdated: "2024-01-08",
      featured: true,
      documentation: {
        setup: "Deploy using Helm: `helm install monitoring ./charts/monitoring`",
        usage: "Access Grafana dashboard at http://localhost:3000 with admin/admin credentials.",
        architecture: "Microservices architecture with separate components for metrics, logs, and traces.",
      },
    },
    {
      id: 3,
      title: "Serverless Data Pipeline",
      description:
        "Event-driven data processing pipeline using AWS Lambda, SQS, and DynamoDB with real-time analytics.",
      longDescription:
        "A scalable serverless data processing system that handles millions of events per day. Features real-time stream processing, automated data validation, error handling, and cost-optimized resource allocation.",
      technologies: ["AWS Lambda", "SQS", "DynamoDB", "Python", "CloudWatch", "S3", "API Gateway"],
      categories: ["Serverless", "Data Engineering", "AWS"],
      githubUrl: "https://github.com/yourusername/serverless-pipeline",
      liveUrl: "https://serverless-pipeline-demo.vercel.app",
      image: "/serverless-pipeline-project.jpg",
      status: "Production",
      stars: 156,
      forks: 34,
      lastUpdated: "2024-01-01",
      featured: false,
      documentation: {
        setup: "Deploy using AWS SAM: `sam build && sam deploy --guided`",
        usage: "Send events to the API Gateway endpoint to trigger the pipeline.",
        architecture: "Event-driven architecture with Lambda functions processing SQS messages.",
      },
    },
    {
      id: 4,
      title: "Cloud Security Automation",
      description:
        "Automated security compliance checking and remediation across cloud environments using custom policies.",
      longDescription:
        "An intelligent security automation platform that continuously monitors cloud resources for compliance violations and automatically remediates common security issues. Supports custom policy definitions and integration with existing security tools.",
      technologies: ["AWS Config", "CloudFormation", "Python", "IAM", "CloudTrail", "Lambda", "SNS"],
      categories: ["Security", "Automation", "Compliance"],
      githubUrl: "https://github.com/yourusername/cloud-security",
      liveUrl: "https://cloud-security-demo.vercel.app",
      image: "/cloud-security-project.jpg",
      status: "Production",
      stars: 203,
      forks: 56,
      lastUpdated: "2023-12-20",
      featured: false,
      documentation: {
        setup: "Deploy the CloudFormation stack and configure AWS Config rules.",
        usage: "Security violations are automatically detected and reported via SNS.",
        architecture: "Event-driven security monitoring with automated remediation workflows.",
      },
    },
    {
      id: 5,
      title: "Container Registry Mirror",
      description: "High-performance container registry mirror with caching and multi-region replication.",
      longDescription:
        "A distributed container registry solution that provides fast, reliable access to container images across multiple regions. Features intelligent caching, bandwidth optimization, and seamless integration with existing CI/CD pipelines.",
      technologies: ["Docker", "Kubernetes", "Redis", "Nginx", "Go", "Prometheus"],
      categories: ["Containers", "Infrastructure", "Performance"],
      githubUrl: "https://github.com/yourusername/registry-mirror",
      liveUrl: "https://registry-mirror-demo.vercel.app",
      image: "/container-registry-project.jpg",
      status: "Beta",
      stars: 98,
      forks: 23,
      lastUpdated: "2023-12-10",
      featured: false,
      documentation: {
        setup: "Deploy using the provided Kubernetes manifests in the k8s/ directory.",
        usage: "Configure Docker daemon to use the mirror as a registry proxy.",
        architecture: "Distributed caching layer with Redis backend and Nginx proxy.",
      },
    },
    {
      id: 6,
      title: "GitOps Deployment Platform",
      description: "GitOps-based continuous deployment platform with automated rollbacks and canary deployments.",
      longDescription:
        "A modern GitOps platform that automates application deployments using Git as the single source of truth. Includes advanced deployment strategies, automated testing, and intelligent rollback mechanisms.",
      technologies: ["ArgoCD", "Kubernetes", "Helm", "GitLab CI", "Prometheus", "Istio"],
      categories: ["GitOps", "CI/CD", "Kubernetes"],
      githubUrl: "https://github.com/yourusername/gitops-platform",
      liveUrl: "https://gitops-demo.vercel.app",
      image: "/gitops-platform-project.jpg",
      status: "Development",
      stars: 134,
      forks: 29,
      lastUpdated: "2023-11-25",
      featured: false,
      documentation: {
        setup: "Install ArgoCD and apply the application manifests from the apps/ directory.",
        usage: "Push changes to Git repositories to trigger automated deployments.",
        architecture: "GitOps workflow with ArgoCD managing Kubernetes deployments.",
      },
    },
  ]

  const categories = ["All", ...Array.from(new Set(projects.flatMap((project) => project.categories)))]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

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
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Projects Portfolio</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              A collection of cloud engineering projects showcasing infrastructure automation, DevOps practices, and
              modern deployment strategies.
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
                placeholder="Search projects..."
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Featured Projects</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border">
                  <div className="relative h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-card-foreground">{project.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          {project.forks}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 6}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={`/projects/${project.id}`}>
                          <FileText className="w-4 h-4 mr-2" />
                          Details
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            All Projects
            <span className="text-lg font-normal text-muted-foreground ml-2">
              ({filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"})
            </span>
          </h2>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
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
              {regularProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-40">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getStatusColor(project.status)} text-white text-xs`}>{project.status}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-card-foreground line-clamp-1">{project.title}</CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {project.forks}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="w-3 h-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" asChild className="flex-1">
                        <a href={`/projects/${project.id}`}>
                          <FileText className="w-3 h-3 mr-1" />
                          Details
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GitHub Stats */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">GitHub Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {projects.reduce((sum, project) => sum + project.stars, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {projects.reduce((sum, project) => sum + project.forks, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Forks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Public Repos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Array.from(new Set(projects.flatMap((p) => p.technologies))).length}
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
