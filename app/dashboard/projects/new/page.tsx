"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        ecosystem: "",
        area: "",
        gps: "",
        description: "",
        imageUrl: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const token = localStorage.getItem("token")
        if (!token) {
            setError("You must be logged in")
            setLoading(false)
            return
        }

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                router.push("/dashboard/projects")
            } else {
                const data = await res.json()
                setError(data.error || "Failed to upload project")
            }
        } catch (err) {
            setError("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Upload New Project</CardTitle>
                    <CardDescription>Submit your restoration data for AI validation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="grid gap-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" name="name" required onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="e.g. Bali, Indonesia" required onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ecosystem">Ecosystem Type</Label>
                                <Input id="ecosystem" name="ecosystem" placeholder="e.g. Mangrove" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="area">Area (Hectares)</Label>
                                <Input id="area" name="area" type="number" step="0.1" required onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gps">GPS Coordinates</Label>
                                <Input id="gps" name="gps" placeholder="Lat, Long" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                            <Input id="imageUrl" name="imageUrl" placeholder="https://..." onChange={handleChange} />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Analyzing with AI..." : "Submit Project"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
