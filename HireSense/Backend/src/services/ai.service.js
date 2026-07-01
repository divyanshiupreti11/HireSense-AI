const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)


}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    await page.addStyleTag({
    content: `
        @page{
            size:A4;
            margin:8mm;
        }

        body{
    font-size: 12.5px;
    line-height: 1.45;
}

        h1{
            margin:0;
        }

        h2{
            margin-top:8px;
            margin-bottom:4px;
        }

        p,li{
            margin:2px 0;
        }

        ul{
            padding-left:18px;
        }
    `
});

   const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    scale: 1,
    margin: {
        top: "8mm",
        bottom: "8mm",
        left: "10mm",
        right: "10mm"
    }
});

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                   The response must be a JSON object containing a single field named **"html"**. The value of this field should be a complete HTML document that can be directly converted into a PDF using Puppeteer.

Generate a professional, ATS-friendly resume tailored to the provided job description.

Requirements:

* The final resume **MUST fit on exactly ONE A4 page**.
* Never generate a second page.
* If the content becomes too long, shorten descriptions instead of overflowing to another page.
* Use concise, impactful language.
* Do not leave excessive empty space at the bottom of the page.
* Aim to utilize approximately **90% of the available page height**.

Content Guidelines:

* Include only information present in the resume or self-description.
* Never fabricate or invent information.
* Omit missing sections instead of making them up.
* Prioritize the most relevant projects, skills, education, and experience.
* Each project should contain **3 concise bullet points**.
* Each bullet point should be **under 18 words**.
* Include a professional summary only if enough information is available.
* Group technical skills into categories (Languages, Frontend, Backend, Databases, Tools).

Formatting Guidelines:

* Use clean semantic HTML with inline CSS.
* Keep spacing compact and balanced.
* Avoid large margins, paddings, or unnecessary whitespace.
* Do not create page breaks.
* Ensure the final HTML is visually balanced and occupies about **90% of one A4 page**.

Links:

Generate Email, GitHub, LinkedIn, Portfolio, and other URLs as proper HTML anchor tags.

Example:

<a href="mailto:abc@gmail.com">[abc@gmail.com](mailto:abc@gmail.com)</a>

<a href="https://github.com/username">https://github.com/username</a>

Return only the HTML inside the **"html"** field.
The resume should use a comfortable readable font size between 12px and 13px.

Do not reduce the font size below 12px simply to fit the page.

Instead, intelligently balance the content so the resume fills approximately 90% of a single A4 page while remaining easy to read.

Maintain generous section headings, readable spacing and professional typography.

                    `

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }