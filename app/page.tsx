import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, ShieldCheck, Globe, BarChart3, Lock } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Navigation */}
            <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">BlueCred</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/auth/login">
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 shadow-lg shadow-gray-200">Get Started</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                    <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                    <div className="mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 mb-8 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            The Future of Blue Carbon Markets
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8">
                            Decentralized Verification for <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">Real Impact</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            BlueCred uses AI and Blockchain to verify blue carbon projects with unprecedented transparency. Connect directly with NGOs and trade verified credits instantly.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/auth/signup">
                                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-lg h-12 shadow-xl shadow-green-200">
                                    Start Trading <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-gray-300 text-gray-700 hover:bg-gray-50">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="py-24 sm:py-32 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center mb-16">
                            <h2 className="text-base font-semibold leading-7 text-primary">Deploy faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to trust carbon credits
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col items-start">
                                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50 mb-6">
                                        <ShieldCheck className="h-8 w-8 text-primary" />
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">AI-Powered Verification</dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">Our AI analyzes satellite imagery and field data to verify project authenticity and carbon sequestration potential automatically.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50 mb-6">
                                        <Lock className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">Immutable Registry</dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">Every credit generated and sold is recorded on our blockchain simulation, ensuring no double-counting and full traceability.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200/50 mb-6">
                                        <BarChart3 className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">Direct Marketplace</dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">Buy directly from project developers. No middlemen, lower fees, and more funds going directly to restoration efforts.</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.green.900),theme(colors.gray.900))] opacity-40" />
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted by global organizations</h2>
                                <p className="mt-4 text-lg leading-8 text-gray-300">
                                    Empowering NGOs and corporations to offset carbon effectively.
                                </p>
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col bg-white/5 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-300">Carbon Sequestered</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">12,000+ tons</dd>
                                </div>
                                <div className="flex flex-col bg-white/5 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-300">Total Projects</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">45+</dd>
                                </div>
                                <div className="flex flex-col bg-white/5 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-300">Capital Deployed</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">$2.4M</dd>
                                </div>
                                <div className="flex flex-col bg-white/5 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-gray-300">Success Rate</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">99.9%</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Leaf className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 font-medium">BlueCred &copy; 2024</span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
