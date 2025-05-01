import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const doctorData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "specialization", "experience", "gender", "consultationFee"]
    for (const field of requiredFields) {
      if (!doctorData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Set default values for optional fields
    const newDoctor = {
      ...doctorData,
      rating: doctorData.rating || 4.0,
      reviewCount: doctorData.reviewCount || 0,
      specializations: doctorData.specializations || [doctorData.specialization],
      languages: doctorData.languages || ["English"],
      availability: doctorData.availability || ["today", "tomorrow"],
      nextAvailable: doctorData.nextAvailable || "Today, 2:00 PM",
      createdAt: new Date(),
    }

    // Insert doctor into database
    const result = await db.collection("doctors").insertOne(newDoctor)

    return NextResponse.json(
      {
        success: true,
        doctorId: result.insertedId,
        message: "Doctor added successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding doctor:", error)
    return NextResponse.json({ error: "Failed to add doctor" }, { status: 500 })
  }
}
