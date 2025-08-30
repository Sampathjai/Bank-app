import React, { useState } from 'react'

export default function TransactionForm({ id, updateBalance }) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('deposit')

  const handleSubmit = e => {
    e.preventDefault()
    const amt = Number(amount)
    if (Number.isNaN(amt) || amt <= 0) {
      window.alert('Enter a valid amount')
      return
    }
    updateBalance(id, amt, type)
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input value={amount} onChange={e => setAmount(e.target.value)} type="number" step="0.01" className="border p-2 rounded w-24" placeholder="0.00" />
      <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Apply</button>
    </form>
  )
}