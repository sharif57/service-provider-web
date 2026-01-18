"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Logo from "./Logo"

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  statistical: boolean
  marketing: boolean
}

export default function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    functional: true,
    statistical: true,
    marketing: true,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        accepted: true,
        preferences: preferences,
        timestamp: new Date().toISOString(),
      }),
    )
    setIsOpen(false)
  }

  const handleDecline = () => {
    const declinedPreferences = {
      necessary: true,
      functional: false,
      statistical: false,
      marketing: false,
    }
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        accepted: false,
        preferences: declinedPreferences,
        timestamp: new Date().toISOString(),
      }),
    )
    setIsOpen(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return // Necessary cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <Logo />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">
              Cookies and Collection of Information About Visitors to the Site
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We use our own cookies and cookies from third parties to collect information about your activity on our
              website, as well as its functionality, so that we can give you the best possible experience on our
              website. Combined with the data you have provided to us, we create a profile that presents you with
              content tailored to your interests.
            </p>

            {/* Policy Links */}
            <div className="space-y-2 mb-4">
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 underline block">
                Read cookie policy here
              </Link>
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 underline block">
                Google's privacy policy
              </Link>
            </div>

            {/* Show Details Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-600 hover:text-gray-800 mb-6 underline"
            >
              {showDetails ? "Hide details" : "Show details"}
            </button>

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-6">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
              >
                No thanks
              </Button>
              <Button onClick={handleAccept} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                Accept
              </Button>
            </div>

            {/* Cookie Categories */}
            {showDetails && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Necessary</h4>
                  </div>
                  <Switch
                    checked={preferences.necessary}
                    disabled={true}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Functional</h4>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) => updatePreference("functional", checked)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Statistical</h4>
                  </div>
                  <Switch
                    checked={preferences.statistical}
                    onCheckedChange={(checked) => updatePreference("statistical", checked)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Marketing</h4>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => updatePreference("marketing", checked)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
