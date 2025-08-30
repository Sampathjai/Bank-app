import React, { useState } from 'react'

export default function BankAccountForm({ addAccount }) {
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('0.00')

  const handleSubmit = e => {
    e.preventDefault()
    if (!name.trim()) return window.alert('Please enter an account holder name')
    const b = Number(balance)
    if (Number.isNaN(b) || b < 0) return window.alert('Enter a valid non-negative number for initial balance')
    addAccount(name.trim(), Number(b).toFixed(2))
    setName('')
    setBalance('0.00')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-600">Account holder</label>
        <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border rounded p-2" placeholder="e.g. Alice" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Initial balance</label>
        <input value={balance} onChange={e => setBalance(e.target.value)} type="number" step="0.01" className="mt-1 w-full border rounded p-2" />
      </div>

      <div>
        <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded">Create</button>
      </div>
    </form>
  )
}