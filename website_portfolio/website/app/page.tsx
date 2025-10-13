"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Cloud, Server, Database, Shield, Calendar, User } from "lucide-react"
import Image from "next/image"
import { useContact } from "@/contexts/contact-context"
import { link } from "fs"

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([])
  const { showContactOptions } = useContact()

  const projects = [
    {
      title: "Serverless Contact Form handler",
      description:
        "A serverless contact form handler, built with AWS Lambda and API Gateway, deployed using Terraform",
      technologies: ["AWS", "AWS Lambda", "Terraform"],
      categories: ["AWS", "AWS Lambda", "Terraform"],
      link: "https://github.com/Nilaj0914/TravelEase-Contact-Form",
    },
    {
      title: "Amplify Portfolio website",
      description:
        "Next.js portfolio website deployed with AWS Amplify, with automatic deployments from GitHub using CICD best practices.",
      technologies: ["Next.js", "AWS", "AWS Amplify", "AWS CDK"],
      categories: ["AWS", "AWS Amplify", "Next.js", "AWS CDK"],
      link: "https://github.com/Nilaj0914/Amplify-Portfolio-website",
    },
    {
      title: "TechHealth AWS Migration",
      description:
        "A case study project involving the migration of a healthcare application built using AWS console to Infrastructure as Code using AWS CDK.",
      technologies: ["AWS", "AWS CDK", "EC2", "RDS", "Security"],
      categories: ["AWS", "AWS CDK", "EC2", "RDS", "Security"],
      link: "https://github.com/Nilaj0914/TechHealth-AWS-Migration",
    },
    
    {
      title: "Pull Request CI/CD Pipeline",
      description:
        "A GitHub Actions CI/CD pipeline that automates testing and deployment of infrastructure changes to AWS using AWS CloudFormation.",
      technologies: ["AWS", "AWS CloudFormation", "GitHub Actions"],
      categories: ["AWS", "AWS CloudFormation", "GitHub Actions"],
      link: "https://github.com/Nilaj0914/Pull-Request-CICD-Pipeline",
    },
  ]

  const blogPosts = [
    {
      title: "Building a Scalable Serverless Contact Form Handler with AWS and Terraform",
      description: "Learn how we created a serverless contact form handler using AWS Lambda and API Gateway, deployed with Terraform",
      date: "October 10,2025",
      categories: ["AWS", "AWS Lambda", "Terraform"],
      readTime: "5 min read",
      link: "https://medium.com/@nilaj.majumder0814/building-a-scalable-serverless-contact-form-handler-with-aws-and-terraform-a-deep-dive-fb16a14a626f"
    },
    {
      title: "Building a Serverless Portfolio with Next.js, AWS Amplify, and CDK",
      description: "Creating a portfolio website using a powerful combination of Next.js for the frontend, AWS Amplify for hosting and deployment, and the AWS Cloud Development Kit (CDK) for defining the infrastructure as code.",
      date: "9/15/25",
      categories: ["AWS", "AWS CDK", "AWS Amplify"],
      readTime: "5 min read",
      link: "https://medium.com/@nilaj.majumder0814/building-a-serverless-portfolio-with-next-js-aws-amplify-and-cdk-29b60bb8ccf4"
    },
    {
      title: "Documenting TechHealth's AWS Migration",
      description: "Deep dive into how we migrated a healthcare web app built using AWS console to AWS CDK.",
      date: "August 31,2025",
      categories: ["AWS", "AWS CDK", "EC2", "RDS", "Security"],
      readTime: "5 min read",
      link: "https://medium.com/@nilaj.majumder0814/techhealth-migration-modernizing-a-healthcare-web-app-on-aws-with-the-cdk-15ef12c907d2"
    },
    
    {
      title: "AWS Certified Cloud Practitioner: My first cloud certification",
      description: "Announcing the completion of my first cloud certification.",
      date: "August 18,2025",
      categories: ["AWS", "AWS Certification"],
      readTime: "1 min read",
      link: "https://medium.com/@nilaj.majumder0814/got-my-first-cloud-certification-3939faad9a10"
    },
  ]

  const skills = [
    { name: "AWS", icon: Cloud },
    { name: "AWS CDK", icon: Cloud },
    { name: "AWS Cloudformation", icon: Cloud },
    { name: "GitHub Actions", icon: Cloud },
    { name: "AWS Amplify", icon: Server },
    { name: "AWS Lambda", icon: Server },
    { name: "Terraform", icon: Database },
    { name: "EC2", icon: Server },
    { name: "RDS", icon: Database },
    { name: "Security", icon: Shield },
  ]

  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredProjects(projects)
      setFilteredBlogs(blogPosts)
    } else {
      setFilteredProjects(projects.filter((project) => project.categories.includes(selectedFilter)))
      setFilteredBlogs(blogPosts.filter((blog) => blog.categories.includes(selectedFilter)))
    }
  }, [selectedFilter])

  const handleSkillClick = (skillName: string) => {
    setSelectedFilter(skillName === selectedFilter ? "All" : skillName)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Image
                src="/nilaj.png"
                alt="Professional headshot"
                width={200}
                height={200}
                className="rounded-full border-4 border-primary/20"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Hi, I'm Nilaj Majumder
              </h1>
              <p className="text-xl text-muted-foreground mb-6 text-pretty max-w-2xl">
                A certified AWS Cloud Engineer, I am capable of implementing cloud solutions that are highly available, durable
and fault tolerant leveraging a variety of AWS Services while following industry best practices. I can tackle technical challenges efficiently using solid foundation in cloud native technologies and architectural patterns. I excel in
communication, problem-solving and collaboration.
              </p>
              <div
                id="contact-buttons"
                className={`flex flex-wrap gap-4 justify-center md:justify-start transition-all duration-300 ${
                  showContactOptions ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="https://www.linkedin.com/in/nilaj-majumder-a18061293/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/Nilaj0914" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:nilaj.majumder0814@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Technical Expertise</h2>
          <p className="text-center text-muted-foreground mb-8">
            {selectedFilter === "All" ? "Showing all projects and blog posts" : `Filtered by: ${selectedFilter}`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedFilter("All")}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                selectedFilter === "All"
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card hover:bg-accent/10"
              }`}
            >
              <Database className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">All</span>
            </button>
            {skills.map((skill) => (
              <button
                key={skill.name}
                onClick={() => handleSkillClick(skill.name)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                  selectedFilter === skill.name
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card hover:bg-accent/10"
                }`}
              >
                <skill.icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">{skill.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Featured Projects
            {selectedFilter !== "All" && (
              <span className="text-lg font-normal text-muted-foreground ml-2">({filteredProjects.length})</span>
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.title}
                className="hover:shadow-lg transition-all duration-500 border-border animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl text-card-foreground">{project.title}</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Featured Blog Posts
            {selectedFilter !== "All" && (
              <span className="text-lg font-normal text-muted-foreground ml-2">({filteredBlogs.length})</span>
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredBlogs.map((blog, index) => (
              <Card
                key={blog.title}
                className="hover:shadow-lg transition-all duration-500 border-border animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl text-card-foreground">{blog.title}</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      {/* This is temporary until I write my own blogs, this will link to my Medium blog posts
                      <a href={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>*/}
                      <a href={blog.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {/*Delete lines 277-279 when writing your own blogs and uncomment lines 273-276*/}
                    </Button>
                  </div>
                  <CardDescription className="text-muted-foreground">{blog.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {blog.categories.map((category: string) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blog.readTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Nilaj Majumder Cloud Engineering Portfolio. Built with Next.js.
          </p>
        </div>
      </footer>
    </div>
  )
}
