import styles from './css/Species.module.css'

import { useEffect } from 'react'
import { useGetArticle } from '../../hooks/useGetArticle'

function Species(props) {
  const { getArticle } = useGetArticle()

  useEffect(() => {
    async function fetchData() {
      await getArticle('species')
    }
    fetchData()
  }, [])

  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Species</p>
    </div>
  )
}

export default Species
