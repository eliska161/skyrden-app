import { supabase } from '../lib/supabase'

export default function Home() {
  const loginDiscord = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'discord' })
  }

  const loginRoblox = async () => {
    window.location.href = `https://www.roblox.com/oauth/authorize?client_id=${process.env.ROBLOX_CLIENT_ID}&response_type=code&redirect_uri=${process.env.ROBLOX_REDIRECT_URI}&scope=openid`
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-purple-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Skyrden Recruitment</h1>
      <div className="flex flex-col gap-4">
        <button onClick={loginDiscord} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition">
          Login with Discord
        </button>
        <button onClick={loginRoblox} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">
          Login with Roblox
        </button>
      </div>
    </div>
  )
}
