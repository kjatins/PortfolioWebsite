export interface CaseStudySection {
  id: string;
  title: string;
  description: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  heroSubtitle: string;
  client: string;
  clientUrl?: string;
  duration: string;
  responsibilities: string[];
  scope: string[];
  tags: string[];
  themeColor: string;
  isDarkTheme?: boolean;
  coverImage: string;
  heroImage: string;
  confidentialityNote: string;
  overview: {
    lead?: string;
    description: string[];
  };
  sections: CaseStudySection[];
  retrospective: {
    title: string;
    paragraphs: string[];
  };
  prevProject?: {
    slug: string;
    title: string;
    client: string;
    image: string;
  };
  nextProject?: {
    slug: string;
    title: string;
    client: string;
    image: string;
  };
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface StatMetric {
  value: string;
  label: string;
}

export const PERSONAL_INFO = {
  name: "Jatin Kumar",
  titleBadge: "Jatin Kumar ツ Product Designer",
  roles: ["Product Designer", "Design Hacker"],
  tagline: "I design products that people understand instantly, even when the technology behind them is anything but simple.",
  heroBanner: "Helping Users Think Less, Achieve More",
  email: "jkumarsheoran2612@gmail.com",
  phone: "+91 7746 845046",
  location: "India",
  resumeUrl: "https://drive.google.com/file/d/1i2GLOS4cnr8rwk9XR1n9GCvhX-IWXjG2/view?usp=sharing",
  copyright: "© 2026 JK Sheoran",
  avatar: "https://framerusercontent.com/images/MU6R0KbpNi3xk0YcM2yYb0bIM.jpg",
  footerGraphic: "https://framerusercontent.com/images/cuIB7BYT4dAtaS8g7cOauOUnNcU.png",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jatinkumar05/",
      handle: "jatinkumar05"
    },
    {
      name: "Behance",
      url: "https://www.behance.net/jatinkumar05",
      handle: "jatinkumar05"
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/jatinkumar05",
      handle: "jatinkumar05"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_jatinsheoran",
      handle: "_jatinsheoran"
    }
  ]
};

export const APPROACH_DATA = {
  hero: {
    heading: "How I Approach The Work",
    subheading: "I make complex products easier to understand and use.",
    description: "From enterprise workflows to AI-powered experiences, I work where users, business goals, and technology don’t always agree. My role is to bring structure to that complexity and turn it into something people can understand, use, and trust.",
    tagline: "Complexity is the starting point. Clarity is the goal."
  },
  stats: [
    { value: "10+", label: "Complex Workflows Simplified" },
    { value: "6+", label: "Industries Navigated" },
    { value: "8+", label: "AI Products & Experiences" },
    { value: "30+", label: "Enterprise Journeys Shaped" }
  ] as StatMetric[],
  philosophy: {
    heading: "There is no perfect process. There is a better question.",
    description: "Every project starts differently. Sometimes the problem is clear, but the solution isn’t. Sometimes technology moves faster than the user’s expectations. Sometimes everyone agrees on the problem and still wants different solutions.",
    highlight: "I don’t follow a fixed process. I follow the problem."
  },
  principles: [
    {
      number: "/01",
      title: "Get uncomfortable with the problem.",
      description: "I don’t start by asking what should we build? I start by asking why the problem exists, who feels it, what stands in the way, and what is actually worth solving. The better I understand the problem, the less I have to guess at the solution."
    },
    {
      number: "/02",
      title: "Make the complicated feel obvious.",
      description: "Complex products don’t need complex experiences. I look for the mental model underneath the complexity and use it to make the product easier to understand, navigate, and act on without hiding the complexity that actually matters."
    },
    {
      number: "/03",
      title: "Explore wide. Commit carefully.",
      description: "The first idea is rarely the best one. I explore different directions through prototypes, experiments, conversations, and AI. These help me move faster, challenge assumptions, and see possibilities I might otherwise miss. But speed isn’t the goal. Better decisions are."
    },
    {
      number: "/04",
      title: "Design for the world outside Figma.",
      description: "A design doesn’t live in a presentation. It has to survive engineering constraints, business priorities, edge cases, existing systems, and real-world use. I think about those realities while designing, not after the design is finished."
    },
    {
      number: "/05",
      title: "Sweat the last 10%.",
      description: "Once the direction is right, the details become the difference. Hierarchy. Interaction. States. Content. Motion. Feedback. Those small decisions are what turn a functional product into an experience that feels intentional."
    }
  ] as ApproachPrinciple[],
  closing: {
    title: "The goal isn’t to make things simpler. It’s to make them easier to understand.",
    text: "That’s the standard I try to bring to every product I work on. Whether I’m designing an AI experience, simplifying an enterprise workflow, or building a system that needs to scale, I keep coming back to the same question: Can someone understand what to do next?",
    ctaQuestion: "Want to see how that thinking translates into products?"
  },
  images: {
    banner1: "https://framerusercontent.com/images/nLbDQmUrlLtKrSrZtAAD9TkkQew.png",
    banner2: "https://framerusercontent.com/images/cm8XJt6Buj9eCYwhvVaGFVvNlQk.png",
    banner3: "https://framerusercontent.com/images/2IMoUnmUx9TZ6pYuXUAovZZzgOU.png"
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aiappbuilder",
    slug: "aiappbuilder",
    number: "/01",
    title: "Designing an Ai Application Builder for Faster Product Creation",
    heroSubtitle: "A low-code platform that allows developers and business users to create, customize, and deploy enterprise applications with the help of AI.",
    client: "UnifyApps",
    clientUrl: "https://www.unifyapps.com/",
    duration: "3 Months",
    responsibilities: [
      "Product Design",
      "Design System",
      "Prototyping",
      "Usability Testing"
    ],
    scope: [
      "Low-Code Application Builder",
      "AI-Assisted App Creation",
      "Visual Logic Builder",
      "Theme Customization",
      "Enterprise Permissions"
    ],
    tags: [
      "Ai App Creation",
      "Theme Customisation",
      "Entity Mapping",
      "Release Management"
    ],
    themeColor: "#2563eb",
    isDarkTheme: false,
    coverImage: "https://framerusercontent.com/images/KqgRyixZBGjFr91k0ZDa55Q.png",
    heroImage: "https://framerusercontent.com/images/6M1wPSG9LI3dHlU0u5fyCyIkptY.png",
    confidentialityNote: "Note: Portfolio content has been adapted to respect client confidentiality while accurately representing my design contributions.",
    overview: {
      lead: "UnifyApps is an enterprise platform that enables teams to build custom applications by connecting data sources, defining workflows, and generating user interfaces.",
      description: [
        "The goal of this project was to design an intuitive builder experience where users could quickly assemble screens, bind live data, and customize application logic using both visual tools and AI assistance.",
        "The platform needed to cater to a dual audience: Forward Deployed Engineers (FDEs) who need deep configurability, and Business Analysts who require guided, frictionless creation without manual code writing."
      ]
    },
    sections: [
      {
        id: "section-1",
        title: "Building from Scratch Was Slow and Overwhelming",
        description: [
          "Creating an enterprise application traditionally required multiple handoffs between product managers, designers, and engineers. Users had to manually configure data models, create user interfaces, and write complex integration logic before seeing a working version.",
          "We wanted to eliminate this friction by enabling users to go from a simple prompt or existing data model to a functional application in minutes."
        ],
        image: "https://framerusercontent.com/images/0oMcCM5XOtLlTd4miCOjUrBsxA.png",
        imageAlt: "UnifyApps initial workflow challenges"
      },
      {
        id: "section-2",
        title: "AI-Assisted Application Generation",
        description: [
          "I designed a conversational creation workflow where users describe what they want to build in plain language.",
          "The system analyzes the prompt, recommends relevant data entities, suggests appropriate UI components, and scaffolds the complete application structure. Users can then preview the generated app, refine individual screens, or ask the AI to modify layouts and data bindings."
        ],
        image: "https://framerusercontent.com/images/Uh7sGO28LSu62FqTgG0D7diAnA.png",
        imageAlt: "AI-assisted generation prompt and suggestions"
      },
      {
        id: "section-3",
        title: "Visual Component Canvas & Entity Mapping",
        description: [
          "For fine-grained control, users can customize screens using a visual drag-and-drop builder. I designed a property inspector that dynamically adapts to selected components, allowing users to map database fields, set up conditional visibility, and style elements without touching CSS.",
          "The entity mapping interface clearly highlights data relationships so users understand how inputs flow through the application."
        ],
        image: "https://framerusercontent.com/images/YTdB6igmNsOr3lfPTzKqvd8XJg.png",
        imageAlt: "Visual component canvas and entity bindings"
      },
      {
        id: "section-4",
        title: "Theme Customization & Release Management",
        description: [
          "Enterprise teams need their applications to match brand standards. I designed a global theme editor with support for custom color tokens, typography scales, border radii, and dark mode variations.",
          "Managing multiple iterations across development, staging, and production environments required a streamlined publishing experience. I designed a release management modal that compares changes between versions, flags missing environment variables, and enables instant rollbacks with one click."
        ],
        image: "https://framerusercontent.com/images/KQp5mhfwR4uB1oRFUmlyW2ZpIo.png",
        imageAlt: "Theme editor and release management console"
      }
    ],
    retrospective: {
      title: "What I Learned",
      paragraphs: [
        "Designing an application builder required balancing simplicity for non-technical users with deep flexibility for engineers. The architecture had to support highly configurable enterprise workflows while remaining intuitive for Forward Deployed Engineers (FDEs), Product Managers, and Business Analysts. This pushed me to think beyond individual screens and focus on systems, scalability, and long-term maintainability.",
        "Designing AI-assisted experiences taught me that successful AI products are not just about generating results, they're about creating predictable, transparent, and collaborative workflows where users remain in control. Features such as conversational application creation, dependency visualization, release management, and scalable theme customization reinforced the importance of balancing powerful capabilities with clarity and ease of use.",
        "Most importantly, this project strengthened my ability to simplify technically complex problems into experiences that feel approachable, enabling teams to build, customize, and manage enterprise applications with greater confidence and efficiency."
      ]
    },
    nextProject: {
      slug: "dubaiai",
      title: "Simplifying Government Services Through Human-Centered Conversational AI",
      client: "Digital Dubai",
      image: "https://framerusercontent.com/images/93l1DSquZMSY7rFuh7AeTgrP1nQ.png"
    }
  },
  {
    id: "dubaiai",
    slug: "dubaiai",
    number: "/02",
    title: "Simplifying Government Services Through Human-Centered Conversational AI",
    heroSubtitle: "An AI-powered assistant designed for DubaiNow that transforms complex government and city services into guided conversational experiences, making everyday tasks easier, faster, and more intuitive.",
    client: "Digital Dubai",
    duration: "6 Months",
    responsibilities: [
      "Human-Centered Design",
      "Conversational UX",
      "AI Interaction Design",
      "Service Design"
    ],
    scope: [
      "Conversational Experience Design",
      "Government & City Services",
      "AI Interaction Frameworks",
      "Guided Workflows",
      "Cross-Platform Experiences",
      "Design System"
    ],
    tags: [
      "Accident Reporting Flow",
      "Property Buying Journey",
      "Conversational UX",
      "Design System"
    ],
    themeColor: "#21abe3",
    isDarkTheme: false,
    coverImage: "https://framerusercontent.com/images/hpSeuAXY0RkM5ZlSfjGXAXyeiw.png",
    heroImage: "https://framerusercontent.com/images/fEQDnrbW69kuTY3zUrD7tTM6Juk.png",
    confidentialityNote: "Note: Portfolio content has been adapted to respect client confidentiality while accurately representing my design contributions.",
    overview: {
      lead: "Digital Dubai manages a broad ecosystem of digital services that help residents and visitors access government and city-related services.",
      description: [
        "Within this ecosystem, DubaiNow brings together a wide range of services into a single application. As these services continued to grow, Dubai AI was introduced as an initiative to simplify complex workflows and reduce the effort required to complete everyday tasks through conversational interactions.",
        "Designed with a human-first approach, the experience combined AI guidance with contextual UI components to make services feel more intuitive, approachable, and efficient. Originally intended to be showcased during GITEX 2025, the project continues to evolve and is expected to become publicly available in the future."
      ]
    },
    sections: [
      {
        id: "section-1",
        title: "Making the First Interaction Feel Effortless",
        description: [
          "Rather than expecting users to know what to ask, I designed the first interaction around discoverability.",
          "Quick action cards, service shortcuts, and contextual recommendations help users explore government and city services with minimal effort. As users interact with the assistant, conversational responses are paired with UI cards that explain processes, present relevant actions, and guide users naturally through each workflow."
        ],
        image: "https://framerusercontent.com/images/Jltbizg0nAaX0tk15qQmT0zQAAg.png",
        imageAlt: "Conversational discoverability and service cards"
      },
      {
        id: "section-2",
        title: "When Human Safety Becomes the First Screen",
        description: [
          "For complex services like accident reporting, I designed the experience to prioritize users before the process.",
          "The journey begins with essential safety confirmations and provides immediate access to emergency assistance when needed, ensuring personal safety always comes first.",
          "I also introduced guided photo capture to help users submit complete evidence, making the reporting process more accurate and easier to follow. Once a report is submitted, users can continue tracking its progress directly through the conversation, giving them clear visibility without navigating through multiple screens."
        ],
        image: "https://framerusercontent.com/images/TKUmIjsFjQhCaSDxqoelGX434.png",
        imageAlt: "Safety-first accident reporting workflow"
      },
      {
        id: "section-3",
        title: "Simplifying One of Dubai's Most Complex Workflows",
        description: [
          "Selling a property involves multiple legal steps, documents, and decisions that can quickly become overwhelming.",
          "Instead of exposing users to a traditional form-based workflow, I designed the experience as a guided conversation that breaks the journey into simple, manageable steps.",
          "The assistant introduces the process with a clear overview, retrieves relevant property information automatically, explains unfamiliar legal terms when they appear, and uses contextual UI components to help users review details, confirm actions, and track progress. This approach reduces cognitive effort while making the entire journey feel more transparent, intuitive, and approachable."
        ],
        image: "https://framerusercontent.com/images/UhHTEbnUjPqDbdrIgvGLuf01w.png",
        imageAlt: "Property selling journey and guided steps"
      },
      {
        id: "section-4",
        title: "Building a Foundation for Every AI Conversation",
        description: [
          "Designing a platform that supports a wide range of government and city services required more than individual screens.",
          "I created a reusable design system that standardized conversational components, service cards, quick actions, form elements, and feedback patterns across mobile, desktop, and embedded experiences. This ensured every service felt familiar and consistent while making it easier to scale new workflows without redesigning the experience from scratch."
        ],
        image: "https://framerusercontent.com/images/WFXXmcdQynqiMPUxvnp6KmMktM.png",
        imageAlt: "Design system components and conversational tokens"
      }
    ],
    retrospective: {
      title: "What I Learned",
      paragraphs: [
        "This project reinforced the importance of simplifying complexity without sacrificing flexibility. Working on conversational workflows for millions of residents and travelers challenged me to rethink information architecture, balance legacy government expectations with modern AI interactions, and design solutions that improve operational throughput while maintaining trust and compliance."
      ]
    },
    prevProject: {
      slug: "aiappbuilder",
      title: "Designing an Ai Application Builder for Faster Product Creation",
      client: "UnifyApps",
      image: "https://framerusercontent.com/images/ezyFXDgikxpLA2wn6A82oz1MwA.png"
    },
    nextProject: {
      slug: "sony",
      title: "Making Enterprise Contract Management Faster, Smarter, and More Scalable",
      client: "Sony Pictures Networks",
      image: "https://framerusercontent.com/images/dA2L1B3BunOlahfXfHGy9lLs.png"
    }
  },
  {
    id: "sony",
    slug: "sony",
    number: "/03",
    title: "Making Enterprise Contract Management Faster, Smarter, and More Scalable",
    heroSubtitle: "A digital contract management platform designed for Sony Pictures Networks to streamline contract creation, review workflows, and approval cycles across distributed teams.",
    client: "Sony Pictures Networks",
    clientUrl: "https://www.sonypicturesnetworks.com/",
    duration: "4 Months",
    responsibilities: [
      "Product Design",
      "Enterprise UX",
      "Information Architecture",
      "Workflow Design"
    ],
    scope: [
      "Contract Lifecycle Management",
      "Entity Mapping",
      "Approval Workflows",
      "Document Versioning",
      "Audit Logs"
    ],
    tags: [
      "Contract Creation",
      "Entity Management",
      "Document Versioning",
      "Audit Logs"
    ],
    themeColor: "#e50914",
    isDarkTheme: true,
    coverImage: "https://framerusercontent.com/images/dA2L1B3BunOlahfXfHGy9lLs.png",
    heroImage: "https://framerusercontent.com/images/p33WN4X33rhQSzqKrhp8BVoEhX0.png",
    confidentialityNote: "Note: Portfolio content has been adapted to respect client confidentiality while accurately representing my design contributions.",
    overview: {
      lead: "Sony Pictures Networks manages thousands of licensing agreements, production deals, and distribution contracts each quarter across diverse regional markets.",
      description: [
        "The legacy process was fragmented across email chains, disparate PDF versions, and manual spreadsheets, resulting in long turnaround times and compliance risks.",
        "We designed a modern, centralized enterprise contract management system to unify legal, finance, and operations workflows with robust tracking and automated approval routes."
      ]
    },
    sections: [
      {
        id: "section-1",
        title: "Managing High-Stakes Entertainment Contracts",
        description: [
          "Sony Pictures Networks handles thousands of talent agreements, content licenses, and vendor contracts every year.",
          "The previous process relied heavily on spreadsheets, fragmented email threads, and manual reviews, causing delays and compliance risks. We set out to design a unified platform that provides real-time visibility into contract statuses, automates approval routing, and prevents version discrepancies."
        ],
        image: "https://framerusercontent.com/images/XGs06yCvMZQmgDEIpmw7ir63ZK4.png",
        imageAlt: "Centralized contract overview and metrics"
      },
      {
        id: "section-2",
        title: "Structured Contract Creation & Dynamic Clauses",
        description: [
          "I designed a modular contract creation experience where legal and business teams can assemble agreements from pre-approved clause libraries.",
          "By selecting deal parameters (such as territory, rights duration, and payment schedules), the system automatically compiles relevant terms, minimizing manual drafting errors."
        ],
        image: "https://framerusercontent.com/images/xq8BPNYkmU0fKG9C8Gqg78QqTh4.png",
        imageAlt: "Modular clause selector and dynamic contract assembly"
      },
      {
        id: "section-3",
        title: "Real-Time Collaboration & Version Tracking",
        description: [
          "Negotiating contracts involves multiple rounds of redlines.",
          "I designed a side-by-side comparison view that highlights clause changes between versions, tracks editor comments, and requires explicit sign-offs before promoting drafts to final execution."
        ],
        image: "https://framerusercontent.com/images/dObodtqy4BWUA20R4WvHsM35W4.png",
        imageAlt: "Side-by-side redline diffing and version comparisons"
      },
      {
        id: "section-4",
        title: "Audit Logs & Enterprise Security",
        description: [
          "To satisfy strict compliance and audit requirements, I built comprehensive activity timelines and role-based access levels.",
          "Stakeholders can inspect the full historical trail of approvals, edits, and timestamps at any moment."
        ],
        image: "https://framerusercontent.com/images/h757v7ksO3pgHS0vVknwwr85iJQ.png",
        imageAlt: "Audit log and timeline tracking"
      },
      {
        id: "section-5",
        title: "High-Density Enterprise Design System",
        description: [
          "Enterprise users interact with contracts across varying screen resolutions and complex multi-window workflows. I engineered a high-density, accessible dark design system with tight typographical scale, high contrast data tables, and rapid keyboard navigation."
        ],
        image: "https://framerusercontent.com/images/qwr9fcTa3yzPsG4UaVVzUyksyCc.png",
        imageAlt: "Enterprise design system overview"
      }
    ],
    retrospective: {
      title: "What I Learned",
      paragraphs: [
        "Designing enterprise software for non-technical legal and business users requires obsessive attention to clarity and contrast.",
        "Working on high-density data tables on Windows laptops also pushed me to pay closer attention to accessibility, contrast, information density, and real-world usage conditions. Small decisions around typography, spacing, and layout had a much bigger impact than I initially expected.",
        "Looking back, the project strengthened my ability to design for complex systems, balance business requirements with user needs, and create experiences that remain scalable as products evolve."
      ]
    },
    prevProject: {
      slug: "dubaiai",
      title: "Simplifying Government Services Through Human-Centered Conversational AI",
      client: "Digital Dubai",
      image: "https://framerusercontent.com/images/93l1DSquZMSY7rFuh7AeTgrP1nQ.png"
    },
    nextProject: {
      slug: "thefriedkingroup",
      title: "Bringing Transparency and Human Oversight to AI-Powered Claims Processing",
      client: "The Friedkin Group-USAL",
      image: "https://framerusercontent.com/images/6BKRciEmtzNCLR7pIoicSvZwSg.png"
    }
  },
  {
    id: "thefriedkingroup",
    slug: "thefriedkingroup",
    number: "/04",
    title: "Bringing Transparency and Human Oversight to AI-Powered Claims Processing",
    heroSubtitle: "An AI-powered insurance claims platform that combines multi-agent intelligence with human review to accelerate claim processing while keeping critical decisions transparent and accountable.",
    client: "The Friedkin Group-USAL",
    clientUrl: "https://www.friedkin.com/usal/",
    duration: "1 Months",
    responsibilities: [
      "Product Design",
      "AI Experience Design",
      "Workflow Design"
    ],
    scope: [
      "Multi-Agent AI Pipeline",
      "Claim Review Experience",
      "AI Assistant",
      "Analytics Dashboard"
    ],
    tags: [
      "Multi-Agent AI Pipeline",
      "Claim Review Experience",
      "AI Assistant",
      "Analytics Dashboard"
    ],
    themeColor: "#002339",
    isDarkTheme: false,
    coverImage: "https://framerusercontent.com/images/Fl0D0qaOVYtlUzoYjgerygU08.png",
    heroImage: "https://framerusercontent.com/images/rre5mFrLjJ60Z9ahoHdwmWUOnU.png",
    confidentialityNote: "Note: Portfolio content has been adapted to respect client confidentiality while accurately representing my design contributions.",
    overview: {
      lead: "This project focused on designing an insurance claims platform for The Friedkin Group that combines AI-driven analysis with human review workflows.",
      description: [
        "The platform helps claims teams process vehicle damage claims more efficiently by automating evidence gathering, policy analysis, and claim evaluation while ensuring final decisions remain transparent and accountable."
      ]
    },
    sections: [
      {
        id: "section-1",
        title: "Processing Claims at Scale",
        description: [
          "Insurance teams often manage hundreds of claims moving through different stages of review.",
          "We designed a centralized dashboard that provides visibility into claim status, priorities, and workload, helping adjusters quickly understand what requires attention and where action is needed."
        ],
        image: "https://framerusercontent.com/images/jmxKDNwCo5dgkXVVajL9KONOG2s.png",
        imageAlt: "Centralized claim queue and triage dashboard"
      },
      {
        id: "section-2",
        title: "Understanding How AI Reaches a Decision",
        description: [
          "Since multiple AI agents were involved in processing a claim, it was important for users to understand how each agent contributed to the final recommendation.",
          "Instead of treating AI as a black box, I designed dedicated views that expose the reasoning process of each agent, allowing users to follow the analysis step by step and understand how evidence, policy references, and claim details were evaluated throughout the workflow."
        ],
        image: "https://framerusercontent.com/images/SJOd8xaxJOUnYb6pvfFreoAjQ.png",
        imageAlt: "Multi-agent reasoning timeline and evidence traceability"
      },
      {
        id: "section-3",
        title: "Make Complex Decisions at Ease with Ai",
        description: [
          "Trust was a key part of the experience. To help users better understand AI recommendations, we introduced an AI assistant that allows reviewers to explore policies, ask questions, and get additional context during the review process.",
          "I also added a Similar Claims in History section that surfaces previously resolved claims and their outcomes, helping users understand how similar cases were handled in the past.",
          "While AI assisted throughout the workflow, the final decision always remained with the reviewer, ensuring accountability stayed in human hands."
        ],
        image: "https://framerusercontent.com/images/HtAvUhUYtmfgoV4VFaeSQsXUgE.png",
        imageAlt: "AI copilot assistant and similar claims history lookup"
      }
    ],
    retrospective: {
      title: "What I Learned",
      paragraphs: [
        "This project strengthened my understanding of designing AI-powered experiences where trust is just as important as efficiency.",
        "It taught me how to present AI recommendations in a way that feels transparent and actionable while ensuring users remain confident and in control of critical decisions.",
        "The experience continues to influence how I approach AI-assisted workflows and decision-support systems today."
      ]
    },
    prevProject: {
      slug: "sony",
      title: "Making Enterprise Contract Management Faster, Smarter, and More Scalable",
      client: "Sony Pictures Networks",
      image: "https://framerusercontent.com/images/dA2L1B3BunOlahfXfHGy9lLs.png"
    },
    nextProject: {
      slug: "amnhealthcare",
      title: "Reimagining Credential Management for Faster and More Scalable Healthcare Operations",
      client: "AMN Healthcare",
      image: "https://framerusercontent.com/images/Fl0D0qaOVYtlUzoYjgerygU08.png"
    }
  },
  {
    id: "amnhealthcare",
    slug: "amnhealthcare",
    number: "/05",
    title: "Reimagining Credential Management for Faster and More Scalable Healthcare Operations",
    heroSubtitle: "A healthcare staffing platform that simplifies credentialing by bringing candidates, compliance, and facility requirements into a single, streamlined workflow.",
    client: "AMN HealthCare",
    clientUrl: "https://www.amnhealthcare.com/",
    duration: "3 Months",
    responsibilities: [
      "Product Design",
      "Workflow Design",
      "Information Architecture"
    ],
    scope: [
      "Placement Workflows",
      "Compliance Tracking",
      "Credentialing Experience"
    ],
    tags: [
      "Placement Workflows",
      "Compliance Tracking",
      "Credentialing Experience"
    ],
    themeColor: "#003c69",
    isDarkTheme: false,
    coverImage: "https://framerusercontent.com/images/6BKRciEmtzNCLR7pIoicSvZwSg.png",
    heroImage: "https://framerusercontent.com/images/JcGHEM9j3OOvdKI0M4Rzj2H1i94.png",
    confidentialityNote: "Note: Portfolio content has been adapted to respect client confidentiality while accurately representing my design contributions.",
    overview: {
      lead: "AMN Healthcare needed a centralized platform to manage the credentialing process required before healthcare professionals can be placed at facilities.",
      description: [
        "The experience had to bring together candidates, facility requirements, compliance documents, and placement workflows into a single system, helping teams track progress and reduce manual coordination."
      ]
    },
    sections: [
      {
        id: "section-1",
        title: "Understanding the Existing Experience",
        description: [
          "The existing requirement management workflow was built around a deeply nested hierarchy that became difficult to navigate as requirements grew across different regulatory levels.",
          "Users often had to move through multiple steps to find, assign, or manage rules, making the process feel slower and more complex than it needed to be."
        ],
        image: "https://framerusercontent.com/images/uyJCpWoggQrwY9sF4nwm8kxvOg.png",
        imageAlt: "Legacy nested hierarchy analysis"
      },
      {
        id: "section-2",
        title: "Redesigning the Experience",
        description: [
          "My goal was to simplify how requirements were organized without removing the flexibility users relied on.",
          "I redesigned the experience around a folder-based structure that made it easier to navigate between federal, state, county, and city-level requirements while keeping the overall hierarchy clear and manageable."
        ],
        image: "https://framerusercontent.com/images/awHvXj5OwiUrYAUIbKaBn7zxk.png",
        imageAlt: "Folder-based requirement structure and clean IA"
      },
      {
        id: "section-3",
        title: "Reducing Repetitive Work",
        description: [
          "Many rules needed to be recreated across multiple levels, creating unnecessary manual effort.",
          "To streamline this process, I introduced a bulk import workflow that allows users to reuse existing rules and apply them where needed, making large-scale updates significantly faster."
        ],
        image: "https://framerusercontent.com/images/ZmphY2vTdTgyg8Z67sOVbPpTHwU.png",
        imageAlt: "Bulk import rules workflow and cascade updates"
      },
      {
        id: "section-4",
        title: "Managing Requirement Details",
        description: [
          "Each requirement can contain multiple supporting documents that need to be reviewed and validated before completion.",
          "I designed a detailed view that brings together document information, status, and requirement-specific updates in one place, helping users understand what is required and track progress without losing context."
        ],
        image: "https://framerusercontent.com/images/iO0TJJtKmpki3convo134NB0E.png",
        imageAlt: "Document inspection and requirement validation modal"
      }
    ],
    retrospective: {
      title: "What I Learned",
      paragraphs: [
        "This project reinforced the importance of simplifying complexity without sacrificing flexibility.",
        "Working on requirement management challenged me to rethink information architecture, balance legacy expectations with modern workflows, and design solutions that improve efficiency while maintaining compliance and user trust."
      ]
    },
    prevProject: {
      slug: "thefriedkingroup",
      title: "Bringing Transparency and Human Oversight to AI-Powered Claims Processing",
      client: "The Friedkin Group-USAL",
      image: "https://framerusercontent.com/images/6BKRciEmtzNCLR7pIoicSvZwSg.png"
    }
  }
];
