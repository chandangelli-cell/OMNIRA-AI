export const MEDICAL_DISCLAIMER = `⚠️ OMNIRA HEALTHCARE DISCLAIMER: Omnira Healthcare Assistant provides general informational and educational guidance only. It is NOT a substitute for professional medical advice, diagnosis, or clinical treatment. If you are experiencing severe pain, difficulty breathing, chest pain, high persistent fever, or a medical emergency, please contact emergency services (108 / 112) or go to the nearest emergency room immediately.`;

export const COMMON_SYMPTOMS_DB = [
  {
    symptomKey: "headache_fever",
    keywords: ["headache", "fever", "body pain", "temperature", "chills"],
    title: "Mild Fever & Headache Guidance",
    possibleCauses: [
      "Viral upper respiratory infection (Common Cold / Flu)",
      "Dehydration or eye strain",
      "Stress or mild tension headache"
    ],
    urgencyLevel: "Low to Moderate",
    urgencyBadgeColor: "yellow",
    selfCareSteps: [
      "Rest adequately in a well-ventilated quiet room.",
      "Stay hydrated with plenty of fluids (water, ORS, warm broth).",
      "Monitor body temperature using a digital thermometer every 4 hours."
    ],
    safeOtcEducation: [
      "Over-the-counter paracetamol/acetaminophen may help temporarily reduce mild fever and headache in healthy adults.",
      "Always check dosage guidelines on the product package and consult a certified pharmacist or doctor.",
      "Avoid taking multiple medications containing paracetamol simultaneously to prevent accidental overdose."
    ],
    warningSigns: [
      "Fever exceeding 103°F (39.4°C) or lasting more than 3 consecutive days",
      "Stiff neck, severe light sensitivity, or sudden confusion",
      "Shortness of breath or persistent chest discomfort"
    ],
    recommendedSpecialist: "General Physician / Internal Medicine Specialist"
  },
  {
    symptomKey: "stomach_pain",
    keywords: ["stomach pain", "nausea", "acidity", "indigestion", "cramps", "bloating"],
    title: "Indigestion & Stomach Discomfort Guidance",
    possibleCauses: [
      "Acid reflux / Gastritis",
      "Dietary indiscretion or mild food sensitivity",
      "Intestinal gas or bloating"
    ],
    urgencyLevel: "Low to Moderate",
    urgencyBadgeColor: "yellow",
    selfCareSteps: [
      "Sip warm water or chamomile tea.",
      "Avoid spicy, greasy, citrus, or heavy meals for 24 hours.",
      "Eat light meals like khichdi, bananas, or toast."
    ],
    safeOtcEducation: [
      "OTC antacids or oral rehydration salts may relieve temporary acidity or mild dehydration.",
      "Consult a pharmacist if taking prescription medications."
    ],
    warningSigns: [
      "Sudden severe intense localized abdominal pain (especially lower right side)",
      "Persistent vomiting or inability to retain fluids for 12+ hours",
      "Black or bloody stool"
    ],
    recommendedSpecialist: "Gastroenterologist / General Physician"
  },
  {
    symptomKey: "cough_cold",
    keywords: ["cough", "sore throat", "runny nose", "congestion", "sneezing"],
    title: "Sore Throat & Cough Guidance",
    possibleCauses: [
      "Seasonal allergies / Rhinitis",
      "Mild viral upper respiratory tract illness",
      "Environmental irritants or dry air"
    ],
    urgencyLevel: "Low",
    urgencyBadgeColor: "green",
    selfCareSteps: [
      "Gargle with warm salt water 3-4 times a day.",
      "Use steam inhalation or a warm room humidifier.",
      "Drink warm honey-lemon water (for adults and children over 1 year)."
    ],
    safeOtcEducation: [
      "Saline nasal spray can soothe nasal congestion.",
      "OTC lozenges may ease throat discomfort."
    ],
    warningSigns: [
      "Difficulty swallowing or breathing",
      "Coughing up blood or rust-colored phlegm",
      "High fever lasting over 48 hours"
    ],
    recommendedSpecialist: "ENT Specialist / General Physician"
  }
];

export const NEARBY_HEALTHCARE_FACILITIES = [
  {
    id: "hosp-001",
    name: "Apollo Speciality Hospital & Emergency",
    type: "24/7 Super Speciality Hospital",
    address: "Road No 2, Jubilee Hills, Hyderabad",
    distanceKm: 1.8,
    phone: "+91 40 2360 7777",
    emergencyNumber: "1066",
    rating: 4.8,
    openStatus: "Open 24/7 Emergency",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hosp-002",
    name: "MedPlus 24x7 Pharmacy & Diagnostic Center",
    type: "Medical Store & Pharmacy",
    address: "Plot 12, Hitech City Main Rd, Hyderabad",
    distanceKm: 0.9,
    phone: "+91 40 4455 6677",
    rating: 4.7,
    openStatus: "Open 24 Hours",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hosp-003",
    name: "Care Family Health Clinic & Pediatrics",
    type: "Polyclinic & Family Doctor",
    address: "Opposite Metro Gate 3, Madhapur, Hyderabad",
    distanceKm: 2.4,
    phone: "+91 40 3344 5566",
    rating: 4.6,
    openStatus: "08:00 AM - 09:00 PM",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  }
];
