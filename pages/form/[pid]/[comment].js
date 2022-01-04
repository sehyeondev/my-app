import { useRouter } from 'next/router'

export default function Form() {
    const router = useRouter()
    const {pid} = router.query
    const {comment} = router.query

    return (
      <div> id page : {pid} - {comment} </div>
    )
  }
  