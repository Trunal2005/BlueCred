"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // We need to create Badge
import { cn } from "@/lib/utils"

// function BadgeDemo removed

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token")
                const headers = token ? { "Authorization": `Bearer ${token}` } : undefined
                const res = await fetch("/api/projects", { headers: headers as any })
                if (res.ok) {
                    const data = await res.json()
                    setProjects(data as any[])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    if (loading) return <div>Loading projects...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <Link href="/dashboard/projects/new">
                    <Button>Upload Project</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{project.name}</CardTitle>
                                <Badge className={cn(
                                    project.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                                        project.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                )}>
                                    {project.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{project.ecosystem} • {project.location}</p>
                            <p className="text-sm line-clamp-3">{project.description}</p>

                            {project.aiReport && (
                                <div className="mt-4 p-3 bg-slate-50 rounded-md text-xs">
                                    <p className="font-semibold">AI Verification Score: {project.aiReport.verificationScore}/100</p>
                                    <p className="text-muted-foreground mt-1">{project.aiReport.summary.substring(0, 100)}...</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <p className="text-xs text-muted-foreground">Owner: {project.owner?.name}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
