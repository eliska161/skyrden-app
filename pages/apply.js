import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Apply() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ question1: '', question2: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('applications').insert([{
      user_id: user.id,
      type: 'General',
      form_data: formData,
      status: 'pending'
    }])
    if (!error) setStatus('Application submitted!')
  }

  if (!user) return <p className="text-center mt-10">Please login first</p>

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Application Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Why do you want to join?" value={formData.question1} onChange={e => setFormData({...formData, question1: e.target.value})} required className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
        <input type="text" placeholder="Your experience?" value={formData.question2} onChange={e => setFormData({...formData, question2: e.target.value})} required className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
        <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition">Submit</button>
      </form>
      {status && <p className="mt-4 text-green-600 font-medium text-center">{status}</p>}
    </div>
  )
}
