"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" // Need to create table component

export default function ExplorerPage() {
    const [records, setRecords] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/blockchain")
            .then(res => res.json())
            .then(data => setRecords(data))
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Blockchain Explorer</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Hash</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Previous Hash</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Project</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {records.map((record) => (
                                    <tr key={record.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 font-mono text-xs">{record.hash.substring(0, 16)}...</td>
                                        <td className="p-4 font-mono text-xs text-muted-foreground">{record.previousHash ? record.previousHash.substring(0, 16) + '...' : 'GENESIS'}</td>
                                        <td className="p-4 font-medium">{record.action}</td>
                                        <td className="p-4">{record.details}</td>
                                        <td className="p-4">{record.project?.name}</td>
                                        <td className="p-4">{new Date(record.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {records.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
