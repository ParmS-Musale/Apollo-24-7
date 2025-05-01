export interface Doctor {
  _id: string
  name: string
  specialization: string
  specializations: string[]
  experience: number
  rating: number
  reviewCount: number
  education: string
  languages: string[]
  consultationFee: number
  gender: "male" | "female"
  availability: string[]
  nextAvailable: string
  profilePicture?: string
}

export interface FilterOptions {
  gender: string[]
  experience: number[]
  availability: string[]
  sortBy: string
  searchTerm: string
}

export interface DoctorResponse {
  doctors: Doctor[]
  totalDoctors: number
  totalPages: number
  currentPage: number
}
