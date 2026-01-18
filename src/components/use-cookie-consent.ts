"use client"

import { useState, useEffect } from "react"

interface CookieConsentData {
  accepted: boolean
  preferences: {
    necessary: boolean
    functional: boolean
    statistical: boolean
    marketing: boolean
  }
  timestamp: string
}

export function useCookieConsent() {
  const [consentData, setConsentData] = useState<CookieConsentData | null>(null)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent")
    if (stored) {
      try {
        const data = JSON.parse(stored) as CookieConsentData
        setConsentData(data)
        setHasConsented(true)
      } catch (error) {
        console.error("Error parsing cookie consent data:", error)
      }
    }
  }, [])

  const clearConsent = () => {
    localStorage.removeItem("cookie-consent")
    setConsentData(null)
    setHasConsented(false)
  }

  return {
    consentData,
    hasConsented,
    clearConsent,
  }
}
