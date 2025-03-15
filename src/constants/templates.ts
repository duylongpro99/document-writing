export const DOCUMENT_TEMPLATES: {
  id: string;
  label: string;
  imageUrl: string;
  initialContent: string;
}[] = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/logo.svg",
    initialContent: ``,
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <section>
        <h2>Project Overview</h2>
        <p>Enter your project description here...</p>
      </section>
      <section>
        <h2>Scope of Work</h2>
        <ul>
          <li>Requirement 1</li>
          <li>Requirement 2</li>
          <li>Requirement 3</li>
        </ul>
      </section>
      <section>
        <h2>Timeline & Deliverables</h2>
        <p>Outline your project timeline here...</p>
      </section>
      <section>
        <h2>Budget</h2>
        <p>Detail your budget information here...</p>
      </section>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <section>
        <h2>Executive Summary</h2>
        <p>Brief overview of your project...</p>
      </section>
      <section>
        <h2>Project Goals</h2>
        <ul>
          <li>Goal 1</li>
          <li>Goal 2</li>
          <li>Goal 3</li>
        </ul>
      </section>
      <section>
        <h2>Implementation Plan</h2>
        <p>Describe your implementation strategy...</p>
      </section>
      <section>
        <h2>Resources Required</h2>
        <p>List required resources here...</p>
      </section>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div class="letter-header">
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP]</p>
        <p>[Date]</p>
      </div>
      <div class="recipient">
        <p>[Recipient Name]</p>
        <p>[Company Name]</p>
        <p>[Address]</p>
        <p>[City, State ZIP]</p>
      </div>
      <div class="letter-content">
        <p>Dear [Recipient Name],</p>
        <p>Enter your letter content here...</p>
        <p>Sincerely,</p>
        <p>[Your Name]</p>
      </div>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <div class="resume">
        <header>
          <h1>[Your Name]</h1>
          <p>[Phone] | [Email] | [Location]</p>
        </header>
        <section>
          <h2>Professional Summary</h2>
          <p>Enter your professional summary here...</p>
        </section>
        <section>
          <h2>Experience</h2>
          <div class="experience-item">
            <h3>[Company Name]</h3>
            <p>[Position] | [Dates]</p>
            <ul>
              <li>Achievement 1</li>
              <li>Achievement 2</li>
            </ul>
          </div>
        </section>
        <section>
          <h2>Education</h2>
          <p>[Degree] - [Institution]</p>
          <p>[Graduation Date]</p>
        </section>
        <section>
          <h2>Skills</h2>
          <ul>
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div class="cover-letter">
        <header>
          <p>[Your Name]</p>
          <p>[Your Address]</p>
          <p>[Phone] | [Email]</p>
          <p>[Date]</p>
        </header>
        <div class="recipient">
          <p>[Hiring Manager's Name]</p>
          <p>[Company Name]</p>
          <p>[Company Address]</p>
        </div>
        <div class="letter-body">
          <p>Dear [Hiring Manager's Name],</p>
          <p>Enter your opening paragraph here...</p>
          <p>Enter your body paragraph here...</p>
          <p>Enter your closing paragraph here...</p>
          <p>Sincerely,</p>
          <p>[Your Name]</p>
        </div>
      </div>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <div class="letter">
        <div class="sender">
          <p>[Your Name]</p>
          <p>[Your Address]</p>
          <p>[Date]</p>
        </div>
        <div class="recipient">
          <p>[Recipient Name]</p>
          <p>[Recipient Address]</p>
        </div>
        <div class="content">
          <p>Dear [Recipient Name],</p>
          <p>Enter your letter content here...</p>
          <p>Best regards,</p>
          <p>[Your Name]</p>
        </div>
      </div>
    `,
  },
];
