"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star, ThumbsUp, Clock, Calendar } from "lucide-react"
import type { Doctor, FilterOptions } from "@/types/doctor"

export default function DoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<FilterOptions>({
    gender: [],
    experience: [0, 30],
    availability: [],
    sortBy: "relevance",
    searchTerm: "",
  })

  useEffect(() => {
    fetchDoctors()
  }, [page, filters])

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        gender: filters.gender.join(","),
        experienceMin: filters.experience[0].toString(),
        experienceMax: filters.experience[1].toString(),
        availability: filters.availability.join(","),
        sortBy: filters.sortBy,
        search: filters.searchTerm,
      })

      const response = await fetch(`/api/doctors?${queryParams.toString()}`)
      const data = await response.json()

      setDoctors(data.doctors)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setPage(1) // Reset to first page when filters change
  }

  const handleGenderChange = (gender: string) => {
    setFilters((prev) => {
      const newGenders = prev.gender.includes(gender)
        ? prev.gender.filter((g) => g !== gender)
        : [...prev.gender, gender]

      return {
        ...prev,
        gender: newGenders,
      }
    })
    setPage(1)
  }

  const handleAvailabilityChange = (availability: string) => {
    setFilters((prev) => {
      const newAvailability = prev.availability.includes(availability)
        ? prev.availability.filter((a) => a !== availability)
        : [...prev.availability, availability]

      return {
        ...prev,
        availability: newAvailability,
      }
    })
    setPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#02475b] mb-2">General Physician & Internal Medicine</h1>
        <p className="text-gray-600">Find and book appointments with top General Physicians</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[#02475b]">Filters</h2>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-[#02475b]">Search</h3>
              <Input
                placeholder="Search by doctor name"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-[#02475b]">Gender</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="male"
                    checked={filters.gender.includes("male")}
                    onCheckedChange={() => handleGenderChange("male")}
                  />
                  <Label htmlFor="male" className="ml-2">
                    Male
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="female"
                    checked={filters.gender.includes("female")}
                    onCheckedChange={() => handleGenderChange("female")}
                  />
                  <Label htmlFor="female" className="ml-2">
                    Female
                  </Label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-[#02475b]">Experience (Years)</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 30]}
                  min={0}
                  max={30}
                  step={1}
                  value={filters.experience}
                  onValueChange={(value) => handleFilterChange("experience", value)}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{filters.experience[0]} years</span>
                  <span>{filters.experience[1]} years</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-[#02475b]">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="today"
                    checked={filters.availability.includes("today")}
                    onCheckedChange={() => handleAvailabilityChange("today")}
                  />
                  <Label htmlFor="today" className="ml-2">
                    Today
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="tomorrow"
                    checked={filters.availability.includes("tomorrow")}
                    onCheckedChange={() => handleAvailabilityChange("tomorrow")}
                  />
                  <Label htmlFor="tomorrow" className="ml-2">
                    Tomorrow
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="weekend"
                    checked={filters.availability.includes("weekend")}
                    onCheckedChange={() => handleAvailabilityChange("weekend")}
                  />
                  <Label htmlFor="weekend" className="ml-2">
                    This Weekend
                  </Label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-[#02475b]">Sort By</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="relevance"
                    checked={filters.sortBy === "relevance"}
                    onCheckedChange={() => handleFilterChange("sortBy", "relevance")}
                  />
                  <Label htmlFor="relevance" className="ml-2">
                    Relevance
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="experience"
                    checked={filters.sortBy === "experience"}
                    onCheckedChange={() => handleFilterChange("sortBy", "experience")}
                  />
                  <Label htmlFor="experience" className="ml-2">
                    Experience
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="rating"
                    checked={filters.sortBy === "rating"}
                    onCheckedChange={() => handleFilterChange("sortBy", "rating")}
                  />
                  <Label htmlFor="rating" className="ml-2">
                    Rating
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Listing */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fc9916]"></div>
            </div>
          ) : (
            <>
              {doctors.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <Card key={doctor._id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 flex flex-col items-center justify-center bg-gray-50">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                              <Image
                                src={doctor.profilePicture || "/placeholder.svg?height=96&width=96"}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3 className="font-semibold text-center text-[#02475b]">{doctor.name}</h3>
                            <p className="text-sm text-gray-500 text-center">{doctor.specialization}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{doctor.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({doctor.reviewCount})</span>
                            </div>
                          </div>

                          <div className="md:w-2/4 p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-200">
                            <div className="mb-3">
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 text-[#02475b]" />
                                <span className="text-sm ml-2">{doctor.experience} years experience</span>
                              </div>
                            </div>

                            <h4 className="font-medium text-[#02475b] mb-1">Specializations</h4>
                            <p className="text-sm text-gray-600 mb-3">{doctor.specializations.join(", ")}</p>

                            <h4 className="font-medium text-[#02475b] mb-1">Education</h4>
                            <p className="text-sm text-gray-600 mb-3">{doctor.education}</p>

                            <h4 className="font-medium text-[#02475b] mb-1">Languages</h4>
                            <p className="text-sm text-gray-600">{doctor.languages.join(", ")}</p>
                          </div>

                          <div className="md:w-1/4 p-4 bg-gray-50 flex flex-col">
                            <div className="mb-3">
                              <h4 className="font-medium text-[#02475b] mb-1">Consultation Fee</h4>
                              <p className="text-lg font-semibold text-[#fc9916]">₹{doctor.consultationFee}</p>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center mb-1">
                                <Clock className="h-4 w-4 text-[#02475b]" />
                                <span className="text-sm ml-2">Available Today</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-[#02475b]" />
                                <span className="text-sm ml-2">Next Available: {doctor.nextAvailable}</span>
                              </div>
                            </div>

                            <Button className="w-full bg-[#fc9916] hover:bg-[#e38a14] text-white">
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Pagination */}
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          onClick={() => setPage(pageNum)}
                          className={pageNum === page ? "bg-[#02475b]" : ""}
                        >
                          {pageNum}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
