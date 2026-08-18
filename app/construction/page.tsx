import { redirect } from 'next/navigation'

// The current home page (the General Construction Division site) is served
// bilingual at /en and /ar. /construction forwards here so visitors who land
// on the branded path reach the full site immediately.
export default function Page() {
  redirect('/en')
}
