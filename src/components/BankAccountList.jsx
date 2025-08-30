import React from 'react'
import TransactionForm from './TransactionForm'

export default function BankAccountList({ accounts, updateBalance, removeAccount }) {
  if (!accounts.length) return <p className="text-sm text-gray-600">No accounts yet — create one above.</p>

  return (
    <div className="space-y-4">
      {accounts.map(acc => (
        <div key={acc.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{acc.name}</h2>
            <p className="text-sm">Balance: <span className="font-mono">{Number(acc.balance).toFixed(2)}</span></p>
          </div>

          <div className="flex items-center gap-3">
            <TransactionForm id={acc.id} updateBalance={updateBalance} />
            <button onClick={() => removeAccount(acc.id)} className="text-sm px-3 py-1 border rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}