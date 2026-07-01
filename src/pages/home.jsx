import { useEffect } from 'react'
import Hero from '../components/main/hero'

export default function Home() {
  useEffect(() => { document.title = "Notes" }, [])

  return <Hero />
}
