import React, { useEffect, useState } from 'react'
import BankAccountForm from './components/BankAccountForm'
import BankAccountList from './components/BankAccountList'

export default function App() {
  const [accounts, setAccounts] = useState(() => {
    try {
      const raw = localStorage.getItem('bank.accounts')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bank.accounts', JSON.stringify(accounts))
  }, [accounts])

  const addAccount = (name, initialBalance) => {
    const account = {
      id: Date.now().toString(),
      name,
      balance: Number(parseFloat(initialBalance).toFixed(2)),
    }
    setAccounts(prev => [...prev, account])
  }

  const updateBalance = (id, amount, type) => {
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id !== id) return acc
        const amt = Number(amount)
        if (Number.isNaN(amt) || amt <= 0) {
          window.alert('Enter a valid positive amount')
          return acc
        }
        if (type === 'withdraw' && amt > acc.balance) {
          window.alert('Insufficient funds')
          return acc
        }
        const newBalance = type === 'deposit' ? acc.balance + amt : acc.balance - amt
        return { ...acc, balance: Number(newBalance.toFixed(2)) }
      })
    )
  }

  const removeAccount = id => {
    if (window.confirm('Delete this account? This action cannot be undone.')) {
      setAccounts(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🏦 SAMPATH VANGI </h1>
        <BankAccountForm addAccount={addAccount} />
        <BankAccountList accounts={accounts} updateBalance={updateBalance} removeAccount={removeAccount} />
      </div>
    </div>
  )
}