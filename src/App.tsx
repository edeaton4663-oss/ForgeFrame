import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState('action')
  const [loading, setLoading] = useState(false)
  const [gameHtml, setGameHtml] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a game prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, genre }),
      })

      const data = await response.json()
      if (data.html) {
        setGameHtml(data.html)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate game')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 text-center">ForgeFrame</h1>
        <p className="text-center text-purple-300 mb-8">AI-Powered Game Generator</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">Create Game</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="action">Action</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="platformer">Platformer</option>
                  <option value="arcade">Arcade</option>
                  <option value="strategy">Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your game idea..."
                  rows={6}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
              >
                {loading ? 'Generating...' : 'Generate Game'}
              </button>
            </div>
          </div>

          {/* Game Preview */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            {gameHtml ? (
              <iframe
                srcDoc={gameHtml}
                className="w-full h-96 rounded bg-black border border-purple-500"
                title="Generated Game"
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-400">
                Your game preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
