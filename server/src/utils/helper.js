const { GoogleGenAI } = require('@google/genai')

const HTTP_STATUS_CODE = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    CREATED: 201,
    PAYLOAD_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    SERVICE_UNAVAILABLE: 503,
}

function buildResumePrompt(resumeText, jobDescription) {
    const systemTemplate = `
        You are an expert technical recruiter and ATS specialist.
        Analyze the resume and optional job description.

        STRICT RULES:
        - Output ONLY valid JSON
        - Do NOT include markdown, explanations, or comments
        - Do NOT include trailing commas
        - Keep overall_summary to MAX 2 sentences
        - Limit all array fields to MAX 6 items

        Required JSON format:
        {
            "overall_summary": string,
            "seniority_level": "junior" | "mid" | "senior" | "lead" | "unknown",
            "key_skills": string[],
            "missing_skills": string[],
            "strengths": string[],
            "weaknesses": string[],
            "ats_score": number,
            "suggestions": string[]
        }
    `
    const humanTemplate = `Analyze the following resume and job description (optional) and produce ONLY the JSON output:
        RESUME:
        -----------------
        ${resumeText}

        JOB DESCRIPTION (optional):
        -----------------
        ${jobDescription}
    `
    return systemTemplate + humanTemplate
}

async function analyzeResume({ resumeText, jobDescription, apiKey }) {
    const ai = new GoogleGenAI({ apiKey })
    const prompt = buildResumePrompt(resumeText, jobDescription)

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        })

        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text
        return text
    } catch (error) {
        throw new Error(error?.message || JSON.stringify(error))
    }
}

module.exports = { analyzeResume, HTTP_STATUS_CODE }
