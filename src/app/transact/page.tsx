"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Nav from "@/components/Nav"

const Teansact = () => {
  const [amount, setAmount] = useState(0.00);
  return (
    <div>

      <Nav />
      <h1 className="text-xl font-bold text-center mb-16">Transact</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Amount">Amount (rwf)</Label>
        <Input type="number" id="Amount" placeholder="0.00" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
      </div>
    </div>
  )
}

export default Teansact