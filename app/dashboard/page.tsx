import Navbar from "@/components/dashboard/Navbar"
import { FontGeneratorForm } from "./_components/FontGeneratorForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto">
        <FontGeneratorForm />
      </main>
    </div>
  )
}

