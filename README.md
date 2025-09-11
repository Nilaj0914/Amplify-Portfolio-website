# Amplify Portfolio Website

This project is a modern, serverless portfolio website built with Next.js for the frontend and deployed on AWS using AWS Amplify. The infrastructure is managed as code using the AWS Cloud Development Kit (CDK), and it features a CI/CD pipeline for automated deployments from GitHub.

## What this project does

This repository contains the code for a personal portfolio website designed to showcase projects and blog posts. It serves as a practical example of combining a popular frontend framework (Next.js) with a robust, scalable, and automated cloud infrastructure on AWS.

The key functionalities are:

* **Dynamic Portfolio Content:** Displays a list of featured projects and blog posts.

* **Content Filtering:** Allows users to filter projects and blogs based on technical skills.

* **CI/CD Automation:** Automatically builds and deploys the website whenever changes are pushed to the `main` branch on GitHub.

## How it does it: Architecture and Design Decisions

The project is split into two main parts: the frontend Next.js application and the backend infrastructure defined with AWS CDK.

### Frontend (`website_portfolio/website`)

* **Framework:** The website is built using **Next.js**, a popular React framework that enables features like static site generation (SSG).

* **Static Site Generation (SSG):** The `next.config.mjs` file is configured with `output: 'export'`, which means the Next.js application is pre-built into static HTML, CSS, and JavaScript files. This approach was chosen for its performance benefits, as static files can be served quickly from a CDN, leading to faster load times and better SEO.

* **UI Components:** The UI is built with **shadcn/ui**, a collection of reusable UI components that provides a consistent and modern look and feel. This choice accelerates development by providing a design system out-of-the-box.

* **Styling:** **Tailwind CSS** is used for styling, allowing for rapid development of a responsive and custom user interface directly within the JSX.

### Backend & Deployment (`website_portfolio/website-infrastructure`)

* **Infrastructure as Code (IaC):** The entire AWS infrastructure is defined using the **AWS Cloud Development Kit (CDK)** in TypeScript. This allows for version-controlled, repeatable, and automated provisioning of cloud resources.

* **Hosting and CI/CD with AWS Amplify:** **AWS Amplify** is used to build, host, and deploy the static Next.js website. The `website-infrastructure-stack.ts` file defines an Amplify App that is connected to the GitHub repository.

  * **Source Code Provider:** Amplify is configured to use GitHub as the source, automatically triggering deployments on pushes to the `main` branch.

  * **Build Process:** The `buildSpec` within the CDK stack defines the build commands. It installs dependencies (`npm install`) and then runs `npm run build-and-export` to generate the static files. The output directory is specified as `website_portfolio/website/out`.

* **Serverless by Design:** By using AWS Amplify to host a static site, the architecture is entirely serverless. This means there are no servers to manage, and the application can scale automatically to handle traffic, with costs directly related to usage.

## How to Clone and Install

To get a local copy up and running, follow these steps.

**Prerequisites:**

* Node.js and npm

* Git

* AWS CLI configured with your credentials

* AWS CDK Toolkit (`npm install -g aws-cdk`)

**Cloning the Repository:**
```bash
git clone https://github.com/Nilaj0914/Amplify-Portfolio-website.git
cd Amplify-Portfolio-website/website_portfolio 
```
**Installing Dependencies:**

1. **Frontend:**
```bash
cd website
npm install
```

2. **Infrastructure:**
```bash
cd ../website-infrastructure
npm install
```
## How to Deploy the Project

1. **GitHub Token:** Before deploying the CDK stack, you need to store a GitHub personal access token in AWS Secrets Manager. This token is required for AWS Amplify to access your repository. Create a secret named `github-token` with your token.

2. **Deploy the Infrastructure:** From the `website-infrastructure` directory, deploy the CDK stack:
```bash
cdk deploy
```
This command will provision the AWS Amplify application and configure the CI/CD pipeline. Once deployed, any push to the `main` branch of your forked repository will trigger a new build and deployment of the website.

3. **Run the Frontend Locally:** To run the Next.js application in a development environment, navigate to the `website` directory and run:
```bash
npm run dev
```
Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in your browser.

