"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function MarketplacePage() {
    const [credits, setCredits] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCredits()
    }, [])

    const fetchCredits = async () => {
        try {
            const res = await fetch("/api/marketplace")
            if (res.ok) {
                setCredits(await res.json())
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleBuy = async (creditId: string) => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login to buy")
            return
        }

        try {
            const res = await fetch("/api/marketplace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ creditId })
            })

            if (res.ok) {
                alert("Purchase successful! Verified on Blockchain.")
                fetchCredits() // Refresh
            } else {
                alert("Purchase failed")
            }
        } catch (error) {
            alert("Error purchasing")
        }
    }

    if (loading) return <div>Loading marketplace...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {credits.map((credit) => (
                    <Card key={credit.id}>
                        <CardHeader>
                            <CardTitle className="text-xl">{credit.project.name}</CardTitle>
                            <CardDescription>{credit.project.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">{credit.amount} tCO2e</div>
                            <p className="text-sm text-muted-foreground">{credit.project.ecosystem}</p>

                            {credit.project.aiReport && (
                                <div className="mt-4 p-2 bg-blue-50 text-blue-800 rounded text-xs font-semibold">
                                    AI Verified Score: {credit.project.aiReport.verificationScore}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleBuy(credit.id)}>Buy Credit</Button>
                        </CardFooter>
                    </Card>
                ))}
                {credits.length === 0 && (
                    <div className="text-muted-foreground col-span-3 text-center py-10">
                        No credits available. Waiting for new verified projects.
                    </div>
                )}
            </div>
        </div>
    )
}
