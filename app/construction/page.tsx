import { redirect } from 'next/navigation'

// The former home page (the General Construction Contracting Division site) is
// now served at the branded path /contracting/en. /construction forwards there
// so visitors who land on the legacy branded path reach the full site.
export default function Page() {
  redirect('/contracting/en')
}
