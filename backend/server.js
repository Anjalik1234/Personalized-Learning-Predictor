const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
console.log("API KEY:", process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/test", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say Hello in Spanish.");
    const response = await result.response;
    const text = response.text();
    res.json({ result: text });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Gemini backend failed", details: error.message });
  }
});

// Generate personalized learning recommendations based on learning style percentages
app.post("/generate-recommendations", async (req, res) => {
  try {
    const { visualPercent, auditoryPercent, kinestheticPercent, userName, skills, branch } = req.body;

    // Determine dominant learning style
    const styles = [
      { name: "Visual", percent: visualPercent },
      { name: "Auditory", percent: auditoryPercent },
      { name: "Kinesthetic", percent: kinestheticPercent }
    ];
    const dominantStyle = styles.reduce((prev, current) => (prev.percent > current.percent) ? prev : current);

    const prompt = `
You are an expert educational consultant. Based on the following learning style analysis, provide personalized recommendations:

Student Profile:
- Name: ${userName || 'Student'}
- Branch/Field: ${branch || 'General'}
- Skills to develop: ${skills ? skills.join(', ') : 'Various technical skills'}

Learning Style Analysis:
- Visual Learning: ${visualPercent}%
- Auditory Learning: ${auditoryPercent}%
- Kinesthetic Learning: ${kinestheticPercent}%
- Dominant Style: ${dominantStyle.name} (${dominantStyle.percent}%)

Please provide specific recommendations in the following format:

**Recommended Learning Formats:**
- [List 4-5 learning formats that match their learning style percentages]

**Suggested Platforms:**
- [List 4-5 online platforms/resources that align with their learning preferences]

**Personalized Study Tips:**
- [Provide 3-4 actionable study tips based on their learning style distribution]

**Resource Recommendations:**
- [Suggest specific types of content (videos, podcasts, hands-on projects, etc.) based on their percentages]

Make the recommendations specific to their dominant learning style while acknowledging their secondary preferences. Keep it practical and actionable.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendations = response.text();

    res.json({
      success: true,
      dominantStyle: dominantStyle.name,
      percentages: {
        visual: visualPercent,
        auditory: auditoryPercent,
        kinesthetic: kinestheticPercent
      },
      recommendations: recommendations
    });

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message || error);
    res.status(500).json({ 
      error: "Failed to generate recommendations", 
      details: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});