"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ContactContextType {
  showContactOptions: boolean
  setShowContactOptions: (show: boolean) => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [showContactOptions, setShowContactOptions] = useState(false)

  return (
    <ContactContext.Provider value={{ showContactOptions, setShowContactOptions }}>{children}</ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider")
  }
  return context
}
