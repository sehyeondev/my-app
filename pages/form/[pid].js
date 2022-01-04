import { useRouter } from 'next/router'

export default function Form() {
    const router = useRouter()
    const {pid} = router.query
    const {foo} = router.query

    return (
      <div> id page : {pid} - {foo} </div>
    )
  }
  