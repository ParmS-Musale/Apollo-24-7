import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Sample doctor data for seeding the database
const sampleDoctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialization: "General Physician",
    specializations: ["General Physician", "Internal Medicine"],
    experience: 15,
    rating: 4.8,
    reviewCount: 243,
    education: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi"],
    consultationFee: 800,
    gender: "male",
    availability: ["today", "tomorrow", "weekend"],
    nextAvailable: "Today, 3:30 PM",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "General Physician",
    specializations: ["General Physician", "Family Medicine"],
    experience: 12,
    rating: 4.7,
    reviewCount: 187,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Bengali"],
    consultationFee: 700,
    gender: "female",
    availability: ["tomorrow", "weekend"],
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    name: "Dr. Anil Gupta",
    specialization: "Internal Medicine",
    specializations: ["Internal Medicine", "Diabetology"],
    experience: 20,
    rating: 4.9,
    reviewCount: 312,
    education: "MBBS, MD (Internal Medicine), DM (Endocrinology)",
    languages: ["English", "Hindi"],
    consultationFee: 1200,
    gender: "male",
    availability: ["today", "weekend"],
    nextAvailable: "Today, 5:00 PM",
  },
  {
    name: "Dr. Sunita Patel",
    specialization: "General Physician",
    specializations: ["General Physician", "Geriatric Medicine"],
    experience: 10,
    rating: 4.6,
    reviewCount: 156,
    education: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: 900,
    gender: "female",
    availability: ["today", "tomorrow"],
    nextAvailable: "Today, 1:00 PM",
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "Internal Medicine",
    specializations: ["Internal Medicine", "Infectious Diseases"],
    experience: 18,
    rating: 4.7,
    reviewCount: 203,
    education: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 1000,
    gender: "male",
    availability: ["tomorrow", "weekend"],
    nextAvailable: "Tomorrow, 11:30 AM",
  },
  {
    name: "Dr. Meera Reddy",
    specialization: "General Physician",
    specializations: ["General Physician", "Preventive Medicine"],
    experience: 8,
    rating: 4.5,
    reviewCount: 98,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Telugu"],
    consultationFee: 600,
    gender: "female",
    availability: ["today", "weekend"],
    nextAvailable: "Today, 4:15 PM",
  },
  {
    name: "Dr. Sanjay Mehta",
    specialization: "Internal Medicine",
    specializations: ["Internal Medicine", "Cardiology"],
    experience: 22,
    rating: 4.9,
    reviewCount: 345,
    education: "MBBS, MD (Internal Medicine), DM (Cardiology)",
    languages: ["English", "Hindi"],
    consultationFee: 1500,
    gender: "male",
    availability: ["tomorrow"],
    nextAvailable: "Tomorrow, 9:00 AM",
  },
  {
    name: "Dr. Ananya Das",
    specialization: "General Physician",
    specializations: ["General Physician", "Women's Health"],
    experience: 14,
    rating: 4.8,
    reviewCount: 176,
    education: "MBBS, MD (General Medicine)",
    languages: ["English", "Hindi", "Bengali"],
    consultationFee: 850,
    gender: "female",
    availability: ["today", "tomorrow", "weekend"],
    nextAvailable: "Today, 2:30 PM",
  },
  {
    name: "Dr. Rahul Verma",
    specialization: "Internal Medicine",
    specializations: ["Internal Medicine", "Respiratory Medicine"],
    experience: 16,
    rating: 4.7,
    reviewCount: 189,
    education: "MBBS, MD (Internal Medicine), DM (Pulmonology)",
    languages: ["English", "Hindi"],
    consultationFee: 1100,
    gender: "male",
    availability: ["weekend"],
    nextAvailable: "Saturday, 10:00 AM",
  },
  {
    name: "Dr. Kavita Joshi",
    specialization: "General Physician",
    specializations: ["General Physician", "Lifestyle Medicine"],
    experience: 9,
    rating: 4.6,
    reviewCount: 112,
    education: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Marathi"],
    consultationFee: 750,
    gender: "female",
    availability: ["today", "tomorrow"],
    nextAvailable: "Today, 6:00 PM",
  },
]

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Check if collection already has data
    const count = await db.collection("doctors").countDocuments()

    if (count > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        count,
      })
    }

    // Insert sample doctors
    await db.collection("doctors").insertMany(sampleDoctors)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      count: sampleDoctors.length,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
