"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { useSubscriptionDetailsQuery } from "@/redux/feature/subscriptionSlice"

export default function OrderForm() {

  const searchParams = useSearchParams();
  const planId = searchParams.get('plan'); // "4"
  console.log(planId)
  const {data} = useSubscriptionDetailsQuery(planId)
  console.log(data, 'place')
  const [formData, setFormData] = useState({
    name: "Abrar Jhon",
    email: "hello@gmail.com",
    price: "$56",
    selectedPackage: "Basic",
    paymentMethod: "Paypal",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order submitted:", formData)
    toast.success('Order placed successfully!')

  }

  return (
    <div className="w-full max-w-xl mx-auto   p-8 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-semibold text-[#374151]">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 px-4  border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-semibold text-[#374151]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Price Field */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-lg font-semibold text-[#374151]">
            Price
          </Label>
          <Input
            id="price"
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="h-12 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Selected Package Field */}
        <div className="space-y-2">
          <Label htmlFor="package" className="text-lg font-semibold text-[#374151]">
            Selected Package
          </Label>
          <Select
            value={formData.selectedPackage}
            onValueChange={(value) => setFormData({ ...formData, selectedPackage: value })}
          >
            <SelectTrigger className="h-12 px-4 py-6 w-full border border-gray-200 rounded-lg bg-white text-gray-900 focus:border-emerald-500 focus:ring-emerald-500">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Standard">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method Field */}
        <div className="space-y-2">
          <Label htmlFor="payment" className="text-lg font-semibold text-[#374151]">
            Payment Method
          </Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
          >
            <SelectTrigger className="h-12 px-4 py-6 w-full border border-gray-200 rounded-lg bg-white text-gray-900 focus:border-emerald-500 focus:ring-emerald-500">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paypal">Paypal</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Stripe">Stripe</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>


        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-[#059669] text-lg font-semibold  cursor-pointer hover:bg-emerald-700 text-[#FFFFFF]  rounded-lg transition-colors duration-200 mt-8"
        >
          Place Order
        </Button>
      </form>
    </div>
  )
}
