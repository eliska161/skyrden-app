import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [applications, setApplications] = useState([])

  const fetchApplications = async () => {
    const { data } = await supabase.from('applications').select('*, users(*)')
    setApplications(data)
  }

  const updateStatus = async (appId, status, feedback = '') => {
    await supabase.from('applications').update({ status, feedback }).eq('id', appId)
    await fetchApplications()
    await fetch(`/api/notify`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ appId, status, feedback })
    })
  }

  useEffect(() => { fetchApplications() }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Discord</th>
            <th className="border px-4 py-2">Roblox</th>
            <th className="border px-4 py-2">Answers</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td className="border px-4 py-2">{app.users?.discord_username}</td>
              <td className="border px-4 py-2">{app.users?.roblox_username}</td>
              <td className="border px-4 py-2">{JSON.stringify(app.form_data)}</td>
              <td className="border px-4 py-2">{app.status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button onClick={() => updateStatus(app.id, 'pass')} className="bg-green-500 px-2 py-1 text-white rounded">Pass</button>
                <button onClick={() => updateStatus(app.id, 'fail')} className="bg-red-500 px-2 py-1 text-white rounded">Fail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
