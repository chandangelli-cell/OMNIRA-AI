import { MOCK_PRODUCTS } from "../mockData/products";
import { MOCK_SHOPS } from "../mockData/shops";
import { MOCK_HOTELS } from "../mockData/hotels";
import { MOCK_RESTAURANTS } from "../mockData/restaurants";
import { COMMON_SYMPTOMS_DB, MEDICAL_DISCLAIMER, NEARBY_HEALTHCARE_FACILITIES } from "../mockData/healthcare";

/**
 * Omnira AI Multi-Agent Orchestrator
 */
export const aiOrchestrator = {
  processQuery: async (userQuery, userContext = {}) => {
    const text = userQuery.toLowerCase().trim();
    
    // Simulate streaming delay for realistic AI feel
    await new Promise(r => setTimeout(r, 600));

    // 1. Intent Detection
    let intent = "GENERAL_ASSISTANCE";

    if (text.includes("phone") || text.includes("laptop") || text.includes("buy") || text.includes("price") || text.includes("under ₹") || text.includes("under ") || text.includes("mobile") || text.includes("gadget") || text.includes("electronics")) {
      if (text.includes("compare") || text.includes("versus") || text.includes("vs") || text.includes("difference")) {
        intent = "COMPARISON";
      } else {
        intent = "PRODUCT_SEARCH";
      }
    } else if (text.includes("compare") || text.includes("vs") || text.includes("which is better")) {
      intent = "COMPARISON";
    } else if (text.includes("hotel") || text.includes("room") || text.includes("stay") || text.includes("resort") || text.includes("hostel") || text.includes("accommodation")) {
      intent = "HOTEL_SEARCH";
    } else if (text.includes("food") || text.includes("restaurant") || text.includes("eat") || text.includes("biryani") || text.includes("veg") || text.includes("dinner") || text.includes("lunch")) {
      intent = "FOOD_SEARCH";
    } else if (text.includes("headache") || text.includes("fever") || text.includes("health") || text.includes("symptom") || text.includes("doctor") || text.includes("stomach") || text.includes("cough") || text.includes("medical") || text.includes("pharmacy") || text.includes("hospital")) {
      intent = "HEALTHCARE";
    } else if (text.includes("near me") || text.includes("nearby") || text.includes("shop near") || text.includes("store near") || text.includes("local shop")) {
      intent = "LOCAL_BUSINESS_SEARCH";
    } else if (text.includes("order") || text.includes("status") || text.includes("track") || text.includes("my purchase")) {
      intent = "ORDER";
    }

    // 2. Delegate to Specialized Sub-Agent
    switch (intent) {
      case "PRODUCT_SEARCH":
        return aiOrchestrator.agents.shoppingAgent(text, userQuery);
      case "COMPARISON":
        return aiOrchestrator.agents.comparisonAgent(text, userQuery);
      case "HOTEL_SEARCH":
        return aiOrchestrator.agents.stayAgent(text, userQuery);
      case "FOOD_SEARCH":
        return aiOrchestrator.agents.foodAgent(text, userQuery);
      case "HEALTHCARE":
        return aiOrchestrator.agents.healthcareAgent(text, userQuery);
      case "LOCAL_BUSINESS_SEARCH":
        return aiOrchestrator.agents.localDiscoveryAgent(text, userQuery);
      case "ORDER":
        return aiOrchestrator.agents.orderAgent(userContext);
      default:
        return aiOrchestrator.agents.generalAssistantAgent(userQuery);
    }
  },

  agents: {
    // Shopping Agent
    shoppingAgent: (text, originalQuery) => {
      // Budget parsing
      let maxBudget = Infinity;
      const budgetMatch = text.match(/(?:under|below|around)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
      if (budgetMatch && budgetMatch[1]) {
        maxBudget = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
        if (text.includes("40,000") || text.includes("40000")) maxBudget = 40000;
        if (text.includes("60,000") || text.includes("60000")) maxBudget = 60000;
      }

      let matchedProducts = MOCK_PRODUCTS.filter(p => p.price <= maxBudget);
      if (matchedProducts.length === 0) matchedProducts = MOCK_PRODUCTS.slice(0, 3);

      const budgetFormatted = maxBudget !== Infinity ? `₹${maxBudget.toLocaleString()}` : "your query";

      return {
        agentName: "Shopping AI Agent",
        agentAvatar: "🛍️",
        intent: "PRODUCT_SEARCH",
        message: `I analyzed available products for ${budgetFormatted}. Here are the top verified products matching your requirements:`,
        products: matchedProducts,
        actionPrompt: "Click 'Compare' on 2 or more products to view a side-by-side spec matrix!",
        suggestedQueries: [
          "Compare these top products",
          "Which phone has the best battery?",
          "Find local shops selling these products"
        ]
      };
    },

    // Comparison Agent
    comparisonAgent: (text, originalQuery) => {
      const selected = MOCK_PRODUCTS.slice(0, 3);

      return {
        agentName: "Comparison AI Agent",
        agentAvatar: "⚖️",
        intent: "COMPARISON",
        message: `Here is an objective side-by-side comparison of the top matched models. Rather than declaring a single forced winner, here is how they differ by use-case:`,
        productsToCompare: selected,
        useCaseAnalysis: [
          { useCase: "🎮 Gaming & Peak Performance", pick: selected[1]?.name || "Nexus Phone Ultra 14", rationale: "Features 144Hz display and 100W HyperCharge." },
          { useCase: "📸 Camera & Content Creation", pick: selected[0]?.name || "Aero X Pro 5G", rationale: "Dedicated 50MP OIS sensor + Telephoto lens with superior low-light tuning." },
          { useCase: "🔋 All-Day Battery & Durability", pick: selected[2]?.name || "Starlight Note 13 Max", rationale: "Monster 6000 mAh battery pack giving up to 2.5 days light use." },
          { useCase: "💻 AI / ML & Heavy Multitasking", pick: MOCK_PRODUCTS[3]?.name || "Vortex Blade 15 AI Laptop", rationale: "Intel Core i7 14-core CPU with high multi-thread bandwidth." }
        ],
        actionPrompt: "Select any item to check available local shops or official online stores.",
        suggestedQueries: [
          "Where can I buy the Aero X Pro locally?",
          "Show laptop options for AI development",
          "Find hotels near me"
        ]
      };
    },

    // Stay Agent
    stayAgent: (text, originalQuery) => {
      return {
        agentName: "Stay & Accommodation AI Agent",
        agentAvatar: "🏨",
        intent: "HOTEL_SEARCH",
        message: `I located verified luxury, boutique, and budget stays near your location with synthesized review summaries:`,
        hotels: MOCK_HOTELS,
        reviewSummaryNote: "Omnira AI parsed 1,500+ guest reviews. Common positive themes: room cleanliness, fast WiFi, central location.",
        suggestedQueries: [
          "Show budget stays under ₹2,000",
          "Find luxury resorts with pool",
          "Show nearby restaurants"
        ]
      };
    },

    // Food Agent
    foodAgent: (text, originalQuery) => {
      return {
        agentName: "Food & Dining AI Agent",
        agentAvatar: "🍽️",
        intent: "FOOD_SEARCH",
        message: `Here are top-rated dining spots and restaurants nearby:`,
        restaurants: MOCK_RESTAURANTS,
        suggestedQueries: [
          "Show pure vegetarian places",
          "Find restaurants open right now",
          "Show top Biryani places nearby"
        ]
      };
    },

    // Healthcare Agent
    healthcareAgent: (text, originalQuery) => {
      let matchedSymptom = COMMON_SYMPTOMS_DB.find(s => 
        s.keywords.some(kw => text.includes(kw))
      ) || COMMON_SYMPTOMS_DB[0];

      return {
        agentName: "Healthcare Guidance AI Agent",
        agentAvatar: "🩺",
        intent: "HEALTHCARE",
        disclaimer: MEDICAL_DISCLAIMER,
        message: `Here is general health education and guidance regarding "${matchedSymptom.title}":`,
        symptomInfo: matchedSymptom,
        nearbyFacilities: NEARBY_HEALTHCARE_FACILITIES,
        suggestedQueries: [
          "Find nearby medical stores open 24/7",
          "Show nearby emergency hospitals",
          "Find food near me"
        ]
      };
    },

    // Local Discovery Agent
    localDiscoveryAgent: (text, originalQuery) => {
      return {
        agentName: "Local Business Discovery AI Agent",
        agentAvatar: "📍",
        intent: "LOCAL_BUSINESS_SEARCH",
        message: `Here are verified local shops around Jubilee Hills & Madhapur offering direct store pickup and same-day delivery:`,
        shops: MOCK_SHOPS,
        suggestedQueries: [
          "Show electronics stores open now",
          "Which store has Aero X Pro in stock?",
          "Find hotels near me"
        ]
      };
    },

    // Order Agent
    orderAgent: (userContext) => {
      return {
        agentName: "Notification & Order AI Agent",
        agentAvatar: "📦",
        intent: "ORDER",
        message: `You can track all active product enquiries and store orders directly from your Orders tab.`,
        suggestedQueries: [
          "Find me the best phone under ₹40,000",
          "Find medical stores nearby"
        ]
      };
    },

    // General Assistant Agent
    generalAssistantAgent: (query) => {
      return {
        agentName: "Omnira Orchestrator AI",
        agentAvatar: "✨",
        intent: "GENERAL_ASSISTANCE",
        message: `Welcome to Omnira-AI! I am your intelligent multi-agent assistant for shopping, discovery, comparison, local businesses, stays, dining, and healthcare guidance. How can I assist you today?`,
        suggestedQueries: [
          "Find me the best phone under ₹40,000",
          "Compare top laptops for AI/ML",
          "Find hotels near me",
          "Show restaurants nearby",
          "I have a headache and fever"
        ]
      };
    }
  }
};
