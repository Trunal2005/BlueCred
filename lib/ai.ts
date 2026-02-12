
interface AIValidationResult {
    verificationScore: number
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    summary: string
}

export async function validateProjectWithAI(projectData: any): Promise<AIValidationResult> {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
        console.warn("OpenAI API Key missing, returning mock data")
        return {
            verificationScore: 85,
            riskLevel: 'LOW',
            summary: "This is a mock validation. The ecosystem data appears consistent with known patterns for this region. (API Key missing)"
        }
    }

    const prompt = `
    Analyze the following Blue Carbon project for credibility and consistency.
    Project Name: ${projectData.name}
    Location: ${projectData.location}
    Ecosystem: ${projectData.ecosystem}
    Area: ${projectData.area} hectares
    Description: ${projectData.description}
    GPS: ${projectData.gps}

    Return a JSON object with:
    - verificationScore (0-100 number)
    - riskLevel (LOW, MEDIUM, HIGH)
    - summary (short paragraph analysis)
  `

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are an expert Blue Carbon Validator. Respond only in JSON." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2
            })
        })

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`)
        }

        const data = await response.json()
        const content = data.choices[0].message.content

        // Parse JSON from content (handle potential markdown fences)
        const jsonStr = content.replace(/```json/g, "").replace(/```/g, "").trim()
        const result = JSON.parse(jsonStr)

        return {
            verificationScore: result.verificationScore,
            riskLevel: result.riskLevel,
            summary: result.summary
        }

    } catch (error) {
        console.error("AI Validation Error:", error)
        return {
            verificationScore: 0,
            riskLevel: 'HIGH',
            summary: "AI Validation failed due to an internal error."
        }
    }
}
