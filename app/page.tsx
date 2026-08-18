import { redirect } from 'next/navigation'

// The single-page site lives under /[lang] so it can be served as /en and /ar.
// Here we just forward the bare root to the default locale.
export default function Page() {
  redirect('/en')
}
