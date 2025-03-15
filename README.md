# Thanks AI support me to write readme - haha
# Wanna try? 
  Go
  ```markdown
  [https://v0-new-project-d2azd6z3jcc.vercel.app/](https://v0-new-project-d2azd6z3jcc.vercel.app/)
  ```
# Write Document - Collaborative Document Editor

A real-time collaborative document editor built with modern web technologies, offering a seamless writing and collaboration experience.

## Tech Stack

### Frontend
- **Next.js** - React framework for production-grade applications
- **TypeScript** - For type-safe code
- **Radix UI** - Headless UI components for building accessible interfaces
- **TipTap** - Rich text editor framework
- **Clerk** - Authentication and user management
- **Liveblocks** - Real-time collaboration features
- **Convex** - Backend and real-time data synchronization

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI Components** - Including:
  - Accordion
  - Alert Dialog
  - Avatar
  - Carousel
  - Dialog
  - Dropdown Menu
  - And more...

## Workflow

### Development
1. Local Development
   ```bash
   npm run dev

   npm run build
   npm run start
   


## GitHub Workflow

The repository uses GitHub Actions for automated builds with two main workflow files:

### Main Build Workflow (`build.yml`)
Located in `.github/workflows/build.yml`, this workflow triggers when pull requests are closed on the main branch.

```yaml
name: Build Application
on:
  pull_request:
    types: [closed]
    branches: [main]
```

The workflow uses the following secret environment variables for secure deployment:

    NEXT_PUBLIC_CONVEX_URL
    CONVEX_DEPLOYMENT
    CLERK_SECRET_KEY
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    LIVE_BLOCK_SECRET_API_KEY

    
Reusable Build Steps ( build-reusable.yml)
Located in .github/workflows/build-reusable.yml, this contains the core build logic:

Environment Setup :

Runs on Ubuntu latest

Uses Node.js version 20

Sets up pnpm package manager (version 8)

Build Process :

Checks out the code

Configures Node.js environment

Installs dependencies using pnpm

Environment Variables : All sensitive information is handled through GitHub Secrets and passed as environment variables during the build process.

Usage
The workflow automatically triggers when:

A pull request is closed on the main branch

The build process is reusable and can be called from other workflows

To manually trigger the workflow, you can:

# Push changes to trigger the workflow
git push origin main

# Or create and merge a pull request to main branch

This explanation provides a clear overview of your GitHub Actions workflow setup, including the trigger conditions, environment configuration, and build process. You can add this to your README.md to help other developers understand your CI/CD pipeline.
