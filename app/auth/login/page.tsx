"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            })

            if (res.ok) {
                const data = await res.json()
                localStorage.setItem("token", data.token)
                router.push("/dashboard")
            } else {
                setError("Invalid credentials")
                setLoading(false)
            }
        } catch (error) {
            setError("An error occurred")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Design Side */}
            <div className="hidden lg:flex flex-col bg-gray-900 relative p-10 text-white dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Leaf className="mr-2 h-6 w-6" />
                    BlueCred
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "This platform has completely transformed how we verify and trade blue carbon credits. The transparency is unmatched."
                        </p>
                        <footer className="text-sm">Sofia Davis, Green Earth NGO</footer>
                    </blockquote>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-gray-50">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email to sign in to your account
                        </p>
                    </div>

                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <form onSubmit={onSubmit}>
                            <CardContent className="space-y-4 pt-6">
                                {error && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <Button className="w-full h-11 text-base" type="submit" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Sign In
                                </Button>
                                <div className="text-center text-sm text-muted-foreground">
                                    Don't have an account?{" "}
                                    <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
                                        Sign up
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>

                    <div className="text-center text-xs text-muted-foreground">
                        <p>Demo accounts:</p>
                        <p>admin@bluecred.io / password123</p>
                        <p>ngo@earth.org / password123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
