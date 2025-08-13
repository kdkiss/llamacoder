export const MODELS = [
  // OpenRouter models
  {
    label: "Qwen Coder (Free)",
    value: "qwen/qwen3-coder:free",
  },
  {
    label: "Kimi (Free)",
    value: "moonshotai/kimi-k2:free",
  },
  {
    label: "Llama 405B (Free)",
    value: "meta-llama/llama-3.1-405b-instruct:free",
  },
  {
    label: "Llama 3.3 70B",
    value: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  },
  {
    label: "DeepSeek V3",
    value: "deepseek-ai/DeepSeek-V3",
  },
  // OpenAI models
  {
    label: "GPT-4o",
    value: "gpt-4o",
  },
  {
    label: "GPT-4o Mini",
    value: "gpt-4o-mini",
  },
  // Anthropic models
  {
    label: "Claude 3.5 Sonnet",
    value: "claude-3-5-sonnet-20241022",
  },
  {
    label: "Claude 3.5 Haiku",
    value: "claude-3-5-haiku-20241022",
  },
  // Mistral models
  {
    label: "Mistral Large",
    value: "mistral-large-latest",
  },
  {
    label: "Codestral",
    value: "codestral-latest",
  },
];

export const SUGGESTED_PROMPTS = [
  {
    title: "AI Chatbot",
    description:
      "Create a modern AI chatbot interface with message history, typing indicators, markdown support, and the ability to export conversations. Include a sidebar with chat history and settings.",
    category: "AI & Machine Learning",
    tags: ["AI", "chat", "interface", "real-time"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Task Management App",
    description:
      "Build a Trello-like task management app with drag-and-drop functionality, boards, lists, and cards. Include due dates, labels, checklists, and team collaboration features.",
    category: "Productivity",
    tags: ["kanban", "drag-drop", "collaboration", "tasks"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Weather Dashboard",
    description:
      "Create a beautiful weather dashboard that shows current conditions, 7-day forecast, interactive maps, and weather alerts. Include location search and save favorite cities.",
    category: "Data Visualization",
    tags: ["weather", "maps", "charts", "location"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Expense Tracker",
    description:
      "Make a personal finance app to track expenses with categories, monthly budgets, spending analytics with charts, and CSV export functionality.",
    category: "Finance",
    tags: ["budget", "analytics", "charts", "export"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Recipe Finder",
    description:
      "Build a recipe discovery app with search by ingredients, dietary filters, step-by-step cooking instructions, timer integration, and the ability to save favorite recipes.",
    category: "Lifestyle",
    tags: ["food", "search", "filters", "timer"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Portfolio Website",
    description:
      "Create a modern developer portfolio with dark mode toggle, project showcase, skills section, contact form, and smooth scrolling animations.",
    category: "Portfolio",
    tags: ["portfolio", "dark-mode", "animations", "responsive"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Music Player",
    description:
      "Design a sleek music player with playlist management, audio visualization, progress bar, volume controls, and keyboard shortcuts for playback.",
    category: "Media",
    tags: ["audio", "playlist", "visualization", "controls"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Real-time Chat",
    description:
      "Build a real-time chat application with rooms, private messaging, emoji support, file sharing, and online user indicators using WebSockets.",
    category: "Communication",
    tags: ["websocket", "real-time", "messaging", "rooms"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "E-commerce Store",
    description:
      "Create a full-featured online store with product catalog, shopping cart, user authentication, payment integration, order tracking, and admin dashboard for inventory management.",
    category: "E-commerce",
    tags: ["shopping", "payments", "auth", "admin"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Social Media Dashboard",
    description:
      "Build a social media management dashboard with post scheduling, analytics tracking, multi-platform integration, content calendar, and engagement metrics visualization.",
    category: "Social Media",
    tags: ["analytics", "scheduling", "integration", "metrics"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Fitness Tracker",
    description:
      "Design a fitness tracking app with workout planning, progress tracking, calorie counting, exercise demonstrations, and social features for sharing achievements.",
    category: "Health & Fitness",
    tags: ["workout", "tracking", "health", "social"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "News Aggregator",
    description:
      "Create a personalized news reader with category filtering, bookmarking, offline reading, dark mode, and real-time updates from multiple sources.",
    category: "News & Media",
    tags: ["news", "filtering", "offline", "real-time"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Video Streaming Platform",
    description:
      "Build a YouTube-like platform with video upload, streaming, playlists, comments, likes, subscriptions, and recommendation algorithms.",
    category: "Media",
    tags: ["video", "streaming", "upload", "recommendations"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Calendar App",
    description:
      "Make a comprehensive calendar application with event scheduling, reminders, recurring events, team sharing, and integration with popular calendar services.",
    category: "Productivity",
    tags: ["calendar", "scheduling", "reminders", "integration"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Code Editor",
    description:
      "Create a web-based code editor with syntax highlighting, auto-completion, multiple language support, file explorer, and live preview functionality.",
    category: "Development",
    tags: ["editor", "syntax", "auto-complete", "preview"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Photo Gallery",
    description:
      "Design a beautiful photo gallery with upload functionality, albums, tagging, search, lightbox viewer, and social sharing capabilities.",
    category: "Media",
    tags: ["photos", "upload", "albums", "sharing"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Booking System",
    description:
      "Build a reservation system for hotels, restaurants, or events with availability checking, booking management, payment processing, and confirmation emails.",
    category: "Business",
    tags: ["booking", "availability", "payments", "notifications"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Learning Platform",
    description:
      "Create an online learning platform with course creation, video lessons, quizzes, progress tracking, certificates, and student-teacher interaction features.",
    category: "Education",
    tags: ["learning", "courses", "quizzes", "certificates"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Cryptocurrency Tracker",
    description:
      "Make a crypto portfolio tracker with real-time prices, historical charts, portfolio analytics, price alerts, and news integration for major cryptocurrencies.",
    category: "Finance",
    tags: ["crypto", "portfolio", "charts", "alerts"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Job Board",
    description:
      "Build a job posting platform with company profiles, job search filters, application tracking, resume upload, and email notifications for new opportunities.",
    category: "Employment",
    tags: ["jobs", "search", "applications", "notifications"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Note Taking App",
    description:
      "Design a note-taking application with rich text editing, tagging, search, sync across devices, collaboration features, and export to multiple formats.",
    category: "Productivity",
    tags: ["notes", "rich-text", "sync", "collaboration"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Restaurant Menu",
    description:
      "Create a digital restaurant menu with categories, dietary filters, high-quality images, online ordering, table reservation, and customer reviews.",
    category: "Food & Beverage",
    tags: ["menu", "ordering", "reservation", "reviews"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Travel Planner",
    description:
      "Build a travel planning app with itinerary creation, budget tracking, destination guides, weather integration, and collaborative trip planning features.",
    category: "Travel",
    tags: ["travel", "itinerary", "budget", "collaboration"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Survey Builder",
    description:
      "Make a survey creation tool with drag-and-drop question types, conditional logic, response analytics, export functionality, and embeddable forms.",
    category: "Business",
    tags: ["survey", "analytics", "forms", "export"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Inventory Management",
    description:
      "Create an inventory system for businesses with product tracking, stock alerts, supplier management, barcode scanning, and detailed reporting features.",
    category: "Business",
    tags: ["inventory", "tracking", "alerts", "reporting"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Podcast Player",
    description:
      "Design a podcast streaming app with episode management, playback speed controls, download for offline listening, subscription management, and sleep timer.",
    category: "Media",
    tags: ["podcast", "streaming", "offline", "subscription"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "Real Estate Listings",
    description:
      "Build a property listing platform with advanced search filters, virtual tours, agent profiles, mortgage calculators, and favorites functionality.",
    category: "Real Estate",
    tags: ["property", "search", "tours", "calculator"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Gaming Leaderboard",
    description:
      "Create a competitive gaming leaderboard with player rankings, match history, statistics tracking, achievement badges, and tournament brackets.",
    category: "Gaming",
    tags: ["gaming", "rankings", "statistics", "tournaments"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Healthcare Dashboard",
    description:
      "Make a patient health monitoring dashboard with appointment scheduling, medication reminders, symptom tracking, and secure communication with healthcare providers.",
    category: "Healthcare",
    tags: ["health", "appointments", "reminders", "tracking"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Event Management",
    description:
      "Build an event planning platform with ticketing, attendee management, schedule creation, speaker profiles, and live streaming capabilities.",
    category: "Events",
    tags: ["events", "ticketing", "streaming", "management"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Language Learning",
    description:
      "Create a language learning app with vocabulary flashcards, pronunciation practice, progress tracking, cultural lessons, and spaced repetition system.",
    category: "Education",
    tags: ["language", "flashcards", "pronunciation", "progress"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "Project Management",
    description:
      "Design a comprehensive project management tool with Gantt charts, resource allocation, time tracking, team collaboration, and client portal features.",
    category: "Productivity",
    tags: ["project", "gantt", "tracking", "collaboration"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Customer Support",
    description:
      "Build a customer support system with ticket management, live chat, knowledge base, FAQ section, and customer satisfaction tracking.",
    category: "Business",
    tags: ["support", "tickets", "chat", "knowledge-base"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Analytics Dashboard",
    description:
      "Create a business analytics dashboard with customizable widgets, real-time data visualization, KPI tracking, and automated report generation.",
    category: "Analytics",
    tags: ["analytics", "dashboard", "visualization", "reports"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Social Network",
    description:
      "Make a social networking platform with user profiles, posts, comments, likes, friend requests, messaging, and privacy controls.",
    category: "Social Media",
    tags: ["social", "profiles", "messaging", "privacy"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "File Sharing",
    description:
      "Build a secure file sharing service with upload/download, link sharing, password protection, expiration dates, and storage management.",
    category: "File Management",
    tags: ["files", "sharing", "security", "storage"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Quiz Application",
    description:
      "Create an interactive quiz app with multiple question types, timer functionality, scoring system, leaderboards, and detailed performance analytics.",
    category: "Education",
    tags: ["quiz", "timer", "scoring", "analytics"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Weather App",
    description:
      "Design a minimalist weather app with current conditions, hourly forecast, severe weather alerts, location services, and customizable themes.",
    category: "Weather",
    tags: ["weather", "forecast", "alerts", "themes"],
    difficulty: "beginner",
    type: "mobile app"
  },
  {
    title: "Budget Planner",
    description:
      "Make a personal budget planning tool with income tracking, expense categorization, savings goals, bill reminders, and financial insights.",
    category: "Finance",
    tags: ["budget", "tracking", "goals", "insights"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "CRM System",
    description:
      "Build a customer relationship management system with contact management, deal tracking, email integration, task scheduling, and sales pipeline visualization.",
    category: "Business",
    tags: ["crm", "contacts", "deals", "pipeline"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Virtual Classroom",
    description:
      "Create an online classroom platform with video conferencing, screen sharing, whiteboard, attendance tracking, and assignment submission features.",
    category: "Education",
    tags: ["classroom", "video", "screen-share", "attendance"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "NFT Marketplace",
    description:
      "Design an NFT marketplace with minting functionality, auction system, bidding, collection management, and wallet integration for cryptocurrency payments.",
    category: "Blockchain",
    tags: ["nft", "marketplace", "auction", "crypto"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Food Delivery",
    description:
      "Build a food delivery app with restaurant listings, menu browsing, cart management, real-time order tracking, and driver assignment system.",
    category: "Food & Beverage",
    tags: ["delivery", "restaurant", "tracking", "cart"],
    difficulty: "advanced",
    type: "mobile app"
  },
  {
    title: "Appointment Scheduler",
    description:
      "Make a booking system for professionals with calendar integration, availability management, automated reminders, and client self-service portal.",
    category: "Business",
    tags: ["booking", "calendar", "reminders", "portal"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Bug Tracker",
    description:
      "Create a software bug tracking system with issue categorization, priority levels, assignment workflow, status updates, and team collaboration features.",
    category: "Development",
    tags: ["bugs", "issues", "workflow", "collaboration"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Investment Portfolio",
    description:
      "Build an investment tracking platform with portfolio performance, asset allocation, risk analysis, market news, and dividend tracking capabilities.",
    category: "Finance",
    tags: ["investment", "portfolio", "analysis", "news"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Digital Wallet",
    description:
      "Design a digital wallet application with transaction history, budget insights, bill splitting, savings goals, and secure payment processing.",
    category: "Finance",
    tags: ["wallet", "transactions", "payments", "security"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "Content Management",
    description:
      "Create a headless CMS with content creation, media library, version control, user roles, and API endpoints for various content types.",
    category: "Development",
    tags: ["cms", "content", "api", "version-control"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Fitness Challenge",
    description:
      "Make a fitness challenge app with workout competitions, progress tracking, team formation, achievement badges, and social sharing features.",
    category: "Health & Fitness",
    tags: ["fitness", "challenges", "teams", "badges"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "Smart Home Dashboard",
    description:
      "Build a smart home control panel with device management, automation rules, energy monitoring, security alerts, and voice command integration.",
    category: "IoT",
    tags: ["smart-home", "automation", "monitoring", "voice"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Subscription Manager",
    description:
      "Create a subscription tracking app with billing reminders, usage analytics, cost optimization suggestions, and cancellation management.",
    category: "Finance",
    tags: ["subscriptions", "billing", "analytics", "optimization"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Event Ticketing",
    description:
      "Design an event ticketing platform with seat selection, dynamic pricing, QR code generation, ticket verification, and attendee management.",
    category: "Events",
    tags: ["ticketing", "seats", "qr-codes", "verification"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Collaborative Whiteboard",
    description:
      "Make a real-time collaborative whiteboard with drawing tools, shape recognition, text annotation, version history, and export functionality.",
    category: "Collaboration",
    tags: ["whiteboard", "drawing", "collaboration", "export"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "AI Image Generator",
    description:
      "Build an AI-powered image generation tool with prompt templates, style selection, image history, download options, and sharing capabilities.",
    category: "AI & Machine Learning",
    tags: ["AI", "image-generation", "templates", "sharing"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Remote Work Hub",
    description:
      "Create a remote work management platform with team check-ins, productivity tracking, virtual office spaces, and integration with popular work tools.",
    category: "Productivity",
    tags: ["remote", "productivity", "tracking", "integration"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Pet Care Tracker",
    description:
      "Design a pet care application with vaccination records, feeding schedules, vet appointments, medication reminders, and pet health monitoring.",
    category: "Lifestyle",
    tags: ["pets", "health", "reminders", "tracking"],
    difficulty: "beginner",
    type: "mobile app"
  },
  {
    title: "Startup Directory",
    description:
      "Build a startup discovery platform with company profiles, funding information, team details, pitch decks, and investor matching features.",
    category: "Business",
    tags: ["startup", "funding", "profiles", "matching"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Mental Health App",
    description:
      "Create a mental wellness app with mood tracking, meditation guides, therapy session booking, progress journals, and crisis support resources.",
    category: "Health & Fitness",
    tags: ["mental-health", "meditation", "tracking", "support"],
    difficulty: "intermediate",
    type: "mobile app"
  },
  {
    title: "Freelance Marketplace",
    description:
      "Make a platform for freelancers with project bidding, portfolio showcase, client reviews, payment protection, and contract management features.",
    category: "Employment",
    tags: ["freelance", "bidding", "portfolio", "payments"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Voice Assistant",
    description:
      "Create a voice-controlled assistant with speech recognition, natural language processing, task automation, smart home integration, and customizable commands.",
    category: "AI & Machine Learning",
    tags: ["voice", "speech", "automation", "smart-home"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Recipe Sharing Platform",
    description:
      "Build a community-driven recipe sharing platform with user-generated content, ratings, comments, ingredient scaling, and meal planning features.",
    category: "Food & Beverage",
    tags: ["recipes", "community", "ratings", "planning"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Study Group App",
    description:
      "Design a study group collaboration app with video calls, shared notes, flashcard creation, progress tracking, and scheduled study sessions.",
    category: "Education",
    tags: ["study", "collaboration", "flashcards", "scheduling"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Plant Care Tracker",
    description:
      "Create a plant care application with watering schedules, growth tracking, disease identification, care tips, and community plant sharing.",
    category: "Lifestyle",
    tags: ["plants", "care", "tracking", "community"],
    difficulty: "beginner",
    type: "mobile app"
  },
  {
    title: "Job Interview Prep",
    description:
      "Build an interview preparation platform with mock interviews, question banks, answer recording, feedback system, and company research tools.",
    category: "Employment",
    tags: ["interview", "preparation", "feedback", "research"],
    difficulty: "beginner",
    type: "web app"
  },
  {
    title: "Habit Tracker",
    description:
      "Make a habit formation app with streak counting, reminder notifications, progress visualization, habit categories, and social accountability features.",
    category: "Productivity",
    tags: ["habits", "streaks", "reminders", "progress"],
    difficulty: "beginner",
    type: "mobile app"
  },
  {
    title: "Virtual Event Platform",
    description:
      "Create a virtual event hosting platform with breakout rooms, networking features, exhibitor booths, live polls, and attendee engagement tools.",
    category: "Events",
    tags: ["virtual", "networking", "booths", "engagement"],
    difficulty: "advanced",
    type: "web app"
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "Design a comprehensive personal finance dashboard with net worth tracking, investment monitoring, bill calendar, spending insights, and financial goal setting.",
    category: "Finance",
    tags: ["finance", "net-worth", "investments", "goals"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Community Forum",
    description:
      "Build a community discussion platform with topic categories, moderation tools, user reputation, private messaging, and content moderation features.",
    category: "Social Media",
    tags: ["forum", "community", "moderation", "reputation"],
    difficulty: "intermediate",
    type: "web app"
  },
  {
    title: "Expense Splitting App",
    description:
      "Create an expense splitting application for groups with receipt scanning, automatic calculations, payment tracking, and settlement features.",
    category: "Finance",
    tags: ["expenses", "splitting", "receipts", "settlement"],
    difficulty: "beginner",
    type: "mobile app"
  },
];
