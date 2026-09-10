import { serve } from "https://deno.land"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Intercept and resolve cross-origin preflight checks
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 1. Establish user context state via token headers
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized operational request')

    // 2. Destructure inputs from the body request payload
    const { prompt, genre } = await req.json()
    if (!prompt) throw new Error('Prompt execution parameter is required')

    // 3. Connect to target LLM gateway endpoint
    const apiKey = Deno.env.get('AI_PROVIDER_API_KEY')
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert game developer engine. Generate a complete, self-contained single-file HTML5 arcade game using HTML/CSS and raw JavaScript or CDN canvas rendering (like Phaser.js or Kaboom.js) based on the user's criteria. 
            CRITICAL RULES:
            1. Return ONLY the completely functional HTML markup, including scripts, CSS assets, and setup loops.
            2. Do NOT wrap your output in markdown code blocks like \`\`\`html or \`\`\`. Return the clean string directly.
            3. Make sure controls are keyboard or mouse accessible within an iframe.
            4. Ensure the game is fully self-contained and works in isolation.`
          },
          {
            role: 'user',
            content: `Build a ${genre} game with this exact directive: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const aiData = await response.json()
    const generatedHtmlCode = aiData.choices[0].message.content

    // 4. Archive the code generation telemetry down into the database
    const { error: dbError } = await supabaseClient
      .from('games')
      .insert({
        user_id: user.id,
        title: `${genre}: ${prompt.substring(0, 20)}...`,
        prompt: prompt,
        game_genre: genre,
        source_code: generatedHtmlCode,
        is_public: false
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ success: true, html: generatedHtmlCode }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error: any) {
    console.error('Edge Function Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
