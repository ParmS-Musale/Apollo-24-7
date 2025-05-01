import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const gender = searchParams.get("gender")
    const experienceMin = Number.parseInt(searchParams.get("experienceMin") || "0")
    const experienceMax = Number.parseInt(searchParams.get("experienceMax") || "30")
    const availability = searchParams.get("availability")
    const sortBy = searchParams.get("sortBy") || "relevance"
    const search = searchParams.get("search") || ""

    // Build query
    const query: any = {
      experience: { $gte: experienceMin, $lte: experienceMax },
    }

    // Add gender filter if provided
    if (gender && gender.length > 0) {
      query.gender = { $in: gender.split(",") }
    }

    // Add availability filter if provided
    if (availability && availability.length > 0) {
      query.availability = { $in: availability.split(",") }
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { specializations: { $elemMatch: { $regex: search, $options: "i" } } },
      ]
    }

    // Build sort options
    const sortOptions: any = {}
    switch (sortBy) {
      case "experience":
        sortOptions.experience = -1
        break
      case "rating":
        sortOptions.rating = -1
        break
      default:
        // Default sort by relevance (we'll use a combination of rating and experience)
        sortOptions.rating = -1
        sortOptions.experience = -1
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Execute query
    const doctors = await db.collection("doctors").find(query).sort(sortOptions).skip(skip).limit(limit).toArray()

    // Get total count for pagination
    const totalDoctors = await db.collection("doctors").countDocuments(query)
    const totalPages = Math.ceil(totalDoctors / limit)

    return NextResponse.json({
      doctors,
      totalDoctors,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
