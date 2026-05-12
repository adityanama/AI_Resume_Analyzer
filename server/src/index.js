const express = require('express')
const multer = require('multer')
const dotenv = require('dotenv')
const cors = require('cors')
const { analyzeResume, HTTP_STATUS_CODE } = require('./utils/helper')
const pdf = require('pdf-parse')

dotenv.config()

const app = express()
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const PORT = process.env.PORT || 3000
const FRONTEND_BASE_URI = process.env.FRONTEND_BASE_URI

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in .env")
}

app.use(express.json())
app.use(cors({ origin: FRONTEND_BASE_URI }))

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})

app.get('/', (req, res) => {
    res.send('Resume Analyzer API is running')
})

/**
 * POST /api/analyze-resume
 * Form-data:
 *   - resume: (file, PDF)
 *   - jobDescription: (text, optional)
 */
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
    const file = req.file
    const jobDescription = req.body.jobDescription?.trim()

    if (!file) {
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({ success: false, error: "PDF file is required" })
    }

    if (file.mimetype !== "application/pdf") {
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({ success: false, error: "Only PDF files are supported." })
    }

    try {
        const data = await pdf(file.buffer)
        const resumeText = data.text

        if (!resumeText || resumeText.trim().length < 50) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: "Could not extract enough text from the PDF.",
            })
        }

        const response = await analyzeResume({
            resumeText,
            jobDescription,
            apiKey: GEMINI_API_KEY,
        })

        res.json({
            success: true,
            data: response ? JSON.parse(response) : '',
        })
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: `Failed to process PDF: ${error instanceof Error ? error.message : String(error)}`,
        })
    }
})

app.listen(PORT, () => {
    console.log(`🚀 Server started successfully at port no. ${PORT}...`)
})
