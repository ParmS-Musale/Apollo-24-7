import type { Metadata } from "next"
import DoctorListing from "@/components/doctor-listing"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
  description:
    "Consult with top General Physician & Internal Medicine specialists. Book appointments online with experienced doctors.",
  openGraph: {
    title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Consult with top General Physician & Internal Medicine specialists. Book appointments online with experienced doctors.",
    type: "website",
    url: "https://apollo-clone.vercel.app/specialties/general-physician-internal-medicine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo 247 Clone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Consult with top General Physician & Internal Medicine specialists. Book appointments online with experienced doctors.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://apollo-clone.vercel.app/specialties/general-physician-internal-medicine",
  },
}

export default function DoctorListingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DoctorListing />
    </main>
  )
}
