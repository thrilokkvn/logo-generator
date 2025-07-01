import { genAI } from "@/config/genAI";
import { NextResponse } from "next/server";
import { HarmBlockThreshold, HarmCategory, Part } from "@google/generative-ai"
import { GenerateContentResponse, Modality } from "@google/genai";
import { supabaseServer } from "@/config/supabaseServer";
import { cookies } from "next/headers";

function extractImageFromResponse(response: GenerateContentResponse) {
    let imageData: string | undefined;
    let imageMimeType: string | undefined;

    if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    imageData = part.inlineData.data;
                    imageMimeType = part.inlineData.mimeType;
                    break;
                }
            }
        }
    }

    return {imageData, mimeType: imageMimeType}
}

export async function POST(req: Request) {
    try {
        const { title, description, industry, logoStyle, colorPalette, includeBrandOrText, includeIcons } = await req.json();
        const promptGenerationInput = `
        You are an expert AI specialized in crafting highly effective text prompts for image generation AI models, specifically for logo design.
        Your task is to generate creative text prompt that, when given to an image generation AI, will produce a logo based on the following specific details:
        ---
        **LOGO DESIGN DETAILS:**
        - **Brand Title:** ${title}
        - **Brand Description:** ${description}
        - **Industry:** ${industry}
        - **Logo Style:** ${logoStyle}
        - **Color Palette:** ${colorPalette}
        - **Include Brand Name in Logo:** ${includeBrandOrText ? "Yes" : "No"}
        - **Include Icons in Logo:** ${includeIcons ? "Yes" : "No"}

        ---
        **COLOR PALETTE RULES:**
        - If the colorPalette is "Let Us Select", then choose an appropriate color palette based on the brand title, description, industry and the logoStyle so that the logo looks visually good.
        - If the colorPalette is "Ocean Blues", then choose the shades of dark blue and other relevant colors like "#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087".
        - If the colorPalette is "Sunset Warmth", then choose the shades of orange and other relevant colors like "#ff6f61", "#ff8566", "#ff9f6b", "#ffb774", "#ffd382".
        - If the colorPalette is "Forest Greens", then choose the shades of green and other relevant colors like "#2a6f4e", "#3e8e68", "#56a581", "#70bd9b", "#8fd6b5".
        - If the colorPalette is "Earthy Browns", then choose the shades of brown and other relevant colors like "#5d4037", "#795548", "#8d6e63", "#a1887f", "#d7ccc8".
        - If the colorPalette is "Soft Purples", then choose the shades of purple and other relevant colors like "#6a1b9a", "#7b1fa2", "#8e24aa", "#9c27b0", "#ab47bc".
        - If the colorPalette is "Corporate Blue", then choose the shades of blue and other relevant colors like "#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe".
        - If the colorPalette is "Modern Grays", then choose the shades of gray and other relevant colors like "#111827", "#374151", "#6b7280", "#9ca3af", "#e5e7eb".
        - If the colorPalette is "Vibrant Energy", then choose vibrant colors like "#dc2626", "#ea580c", "#d97706", "#65a30d", "#059669" etc.
        **IMPORTANT:** Always explicitly mention the chosen or specified colors (including HEX codes if provided) in the final image generation prompt. DO NOT deviate from the specified palette.

        ---
        **PROMPT GENERATION RULES:**
        1.  **DO NOT** include any introductory or concluding remarks.
        2.  **GENERATE ONLY** the final image generation prompt text.
        3.  **The prompt must begin** with: "A ${logoStyle} logo for a ${industry} brand."
        4.  **If "Include Brand Name in Logo" is "Yes"**:
            * Immediately after the opening, add: "The brand name '${title}' is incorporated with [suggest appropriate typography style, e.g., sleek sans-serif, elegant serif, bold modern] typography."
            * Specify a typography style that complements the 'Logo Style'.
        5.  **DO NOT** include the industry name in the logo
        6.  **If "Include Icons in Logo" is "Yes"**:
            * Add a description of a specific, relevant, and visually appropriate icon based on the 'Industry' and 'Brand Description'. Be creative but relevant. For example: "The design features a stylized abstract representation of interconnected data nodes." or "The design features an elegant intertwining of a leaf and water droplet."
            * If "Include Brand Name in Logo" is also "Yes", ensure the icon complements the typography.
        7.  **If "Include Icons in Logo" is "No"**:
            * Add a phrase like: "The design focuses on [abstract shapes or typography] without illustrative icons."
        8.  **Color Palette Application**:
            * Add: "The color palette is [clearly state the chosen or specified color palette, including HEX codes if provided in the rules above]."
        9.  **Overall Feel**:
            * Add: "The overall feel is [suggest appropriate emotion/vibe, e.g., innovative, serene, vibrant, trustworthy, luxurious, sophisticated]."
        10.  **Background**:
            * Conclude the prompt with: "Minimalist vector on a transparent background."

        **GENERATE THE IMAGE GENERATION PROMPT NOW:**
        `
        const generatedPrompt = await genAI.models.generateContent({
            model: process.env.GEMINI_TEXT_MODEL as string,
            contents: promptGenerationInput
        });
        const generatedPromptText = generatedPrompt.text;

        console.log(generatedPromptText)

        const imageGenerationResult = await genAI.models.generateContent({
            model: process.env.GEMINI_IMAGE_MODEL as string,
            contents: [{ role: "user", parts: [{ text: generatedPromptText }] }],
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                ],
            },
        });

        const {imageData, mimeType} = extractImageFromResponse(imageGenerationResult);

        if (imageData && mimeType) {
            console.log("Image extracted successfully");
            console.log("MIME type", mimeType);
        } else {
            console.log("No image found")
        }

        const token = (await cookies()).get("sb-access-token")?.value;
        const {data:user, error: userError} = await supabaseServer.auth.getUser(token);

        const imageBuffer = Buffer.from(imageData as string, 'base64');
        const filename = `${title}-${industry}-${Math.random()}`;

        const {data, error} = await supabaseServer.storage.from("logos").upload(`/public/${filename}`, imageBuffer, {
            contentType: mimeType || 'image/jpeg',
            upsert: true
        });

        if (error) return Response.json({ error: error.message }, { status: 500 });

        const {data: insertData, error: insertError} = await supabaseServer.from("logos").insert({
            id: data.id,
            user_id: user.user?.id,
            title,
            industry,
            created_at: new Date().toISOString(),
            logo_url: `${process.env.SUPABASE_URL}/storage/v1/object/public/logos/public${filename}`
        })

        console.log(data);
        if (insertError) return Response.json({ error: insertError.message }, { status: 500 });

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': mimeType || 'image/jpeg',
                'Content-Disposition': 'inline; filename="generated-logo.jpg"',
            },
            status: 200,
        });

    } catch (error: any) {
        console.error('Error generating logo:', error);
        return NextResponse.json(
            { error: 'Failed to generate logo', details: error.message },
            { status: 500 }
        );
    }
}