"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function AdminPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("/api/projects", { // Reusing projects API, might need admin filter if simple user lists only theirs
                headers: { "Authorization": `Bearer ${token}` }
            })
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

    const handleAction = async (projectId: string, action: 'APPROVE' | 'REJECT') => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("/api/admin/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ projectId, action })
            })

            if (res.ok) {
                alert(`Project ${action}D successfully`)
                fetchProjects()
            } else {
                alert("Action failed")
            }
        } catch (error) {
            alert("Error")
        }
    }

    if (loading) return <div>Loading admin panel...</div>

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Admin Control Panel</h2>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Projects</CardTitle>
                        <CardDescription>Projects awaiting verification and credit minting.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                    <div className="space-y-1">
                                        <h4 className="font-semibold">{project.name}</h4>
                                        <p className="text-sm text-muted-foreground">{project.ecosystem} • {project.location}</p>
                                        {project.aiReport && (
                                            <div className="text-xs mt-1">
                                                <span className="font-bold">AI Score: {project.aiReport.verificationScore}</span> - {project.aiReport.riskLevel} Risk
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className={cn(
                                            project.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                                                project.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        )}>
                                            {project.status}
                                        </Badge>
                                        {project.status === 'PENDING' && (
                                            <>
                                                <Button size="sm" onClick={() => handleAction(project.id, 'APPROVE')}>Approve & Mint</Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleAction(project.id, 'REJECT')}>Reject</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
