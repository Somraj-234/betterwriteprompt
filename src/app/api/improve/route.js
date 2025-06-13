import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const instructions = [
`You are an expert at improving prompts for generative AI focused on images, videos, avatars, branding, graphic design, posters, and typography.

Take the user's original prompt and improve it using your creative and descriptive skills. The result should be:

- A single improved prompt.
- In plain text.
- Without Markdown formatting, bullet points, or headings.
- Do not return multiple prompt variations. Just one.
- Avoid using labels like "Prompt 1", "Style:", etc.

Output only the improved prompt.
`
  
];

const guides = {
  image: `Enhance this prompt for high-quality AI image generation. Focus on:
- Art style (e.g., cinematic, anime, 3D render, digital painting)
- Camera angle and lens type (e.g., low-angle, fish-eye, 35mm, wide shot)
- Lighting setup (e.g., soft bloom, spotlight, natural ambient light, rim light)
- Subject position and pose
- Texture and material (e.g., glossy skin, matte fur, metallic objects)
- Background elements and mood (urban, nature, abstract, studio setup)
- Color palette or gradients (include HEX codes if possible)
- Overall vibe or theme (e.g., nostalgic, cyberpunk, playful, gritty)
Avoid generic wording—treat this like you're directing a photoshoot.`,

  avatar: `Improve this prompt to generate a strong digital avatar with distinct identity. Include:
- Gender, age, expression, and pose
- Clothing style and accessories (e.g., oversized hoodie, rings, neon visor)
- Materials (e.g., soft vinyl skin, plastic texture, metallic jewelry)
- Camera framing and angle (15-degree tilt, close-up headshot, centered)
- Lighting details (e.g., cinematic glow, backlight, high-contrast shadows)
- Background type and mood (studio white, soft blur, vaporwave)
- Personality conveyed (e.g., confident, cute, rebellious, futuristic)
Make sure the avatar feels iconic and usable for branding or digital identity.`,

  character: `Refine this prompt to generate a 3D or illustrated character for branding or storytelling. Include:
- Species or type (e.g., squirrel, robot, dragon)
- Facial expression and attitude (e.g., cheeky, smart, fierce)
- Color palette and gradients (mention HEX codes like #ee7331 for orange)
- Clothing or props (e.g., oversized T-shirt with brand name, tech gadgets)
- Texture and material (e.g., matte fur, glossy eyes, soft plastic)
- Focus (zoom on face, full body, mascot form)
- Background setup (white, neutral, or environment-specific)
The character should feel brandable, iconic, and emotionally resonant. Keep details precise and stylized for marketing use.`,

  video: `Upgrade this prompt for generating a short AI video clip. Focus on:
- Scene composition and motion (e.g., synchronized dance, camera push-in, slow wind)
- Camera movement (handheld feel, dolly-in, tilt, zoom)
- Lighting effects (glowing highlights, ambient dust, shadows shifting)
- Subject action (minimal motion preferred: blinking, hoodie swaying, slight movement)
- Environmental mood (e.g., gritty basement, neon alley, concert stage)
- Loop potential (can this be used as a 3-second loop?)
- Sound/vibe reference if relevant (e.g., slowed reverb music feel)
Keep the scene stable and stylized — prioritize atmosphere over chaotic action.`,

  poster: `Optimize this prompt for a visually striking poster. Specify:
- Layout and composition (centered subject, diagonal elements, grid-aligned text)
- Typography style and placement (modern sans serif, retro serif, bold, clean)
- Lighting and color grading (dramatic shadows, high contrast, neon glow, grain)
- Focal points and text hierarchy
- Background style (gradient, textured, minimal)
- Mood or emotion (cinematic, bold, nostalgic, energetic)
Ensure it feels print-ready, with visual balance and aesthetic polish.`,

  logo: `Improve this prompt to generate a clean, vector-style logo. Include:
- Subject or symbol (e.g., squirrel head, bold letterform, tech icon)
- Style (flat vector, geometric, symmetrical)
- Color scheme (minimal palette, HEX codes like #ee7331 for brand orange)
- Typography for brand name (clean, minimal, scalable)
- Usability (ensure it's suitable for website headers, favicons, app icons)
Keep it simple, iconic, and immediately recognizable. Avoid 3D or photorealism.`,

  meme_parody: `Upgrade this prompt for meme-style or parody visuals. Focus on:
- Cultural references or visual spoofs (e.g., streetwear brands, music videos)
- Camera style (fish-eye lens, front-facing distortion, close-up perspective)
- Lighting setup (lo-fi, overhead fluorescent, green/cyan cast)
- Outfit details (parody logos, street style, exaggerated clothing)
- Mood contrast (serious expression on funny subject)
- Background setting (DIY studio, poster-covered walls, low-budget vibe)
Make it feel like a meme that could go viral — intentional parody with stylized composition.`,

  default: `Refine this prompt to improve any kind of media generation. Make it more descriptive and visually rich by adding:
- Lighting style, material texture, camera logic
- Art style or visual influences
- Background setup and scene framing
- Mood, emotion, or atmosphere
Make the final prompt sound like a creative direction for an artist or AI generator, not just a casual request.`
};

const candidateModels = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-exp",
  "gemini-2.0-flash-exp",
  "gemini-2.0-flash",
  "gemini-1.5-pro-latest"
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, mode } = body;

    if (!prompt) {
      return Response.json(
        { error: "Prompt is missing" },
        { status: 400 }
      );
    }

    const guide = guides[mode] || guides.default;

    let lastError = null;
    for (const modelName of candidateModels) {
      try {
        const model = genAi.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(`${instructions}\n\n${guide}\nOriginal Prompt: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        // If we get a non-empty response, return it
        if (text && typeof text === "string" && text.trim().length > 0) {
          return Response.json({ improvedPrompt: text });
        }
      } catch (err) {
        lastError = err;
        // Try the next model
      }
    }

    // If all models fail
    console.error("All models failed. Last error:", lastError);
    return Response.json({ error: "All models failed to generate a response." }, { status: 500 });

  } catch (err) {
    console.error("Error:", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
