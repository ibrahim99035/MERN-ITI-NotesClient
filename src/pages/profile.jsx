import { useEffect } from 'react'
import ProfileDetails from '../components/profile/details'

export default function Profile() {
  useEffect(() => { document.title = "Profile — Notes" }, [])
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-2">
          Account
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Your profile
        </h1>
      </div>

      <ProfileDetails />
    </div>
  );
}
