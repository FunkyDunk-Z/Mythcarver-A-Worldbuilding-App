import styles from './css/Home.module.css'

function Home(props) {
  const cName = props.pageName ? styles[props.pageName] : ''

  return <div className={`${styles.container} ${cName}`}></div>
}

export default Home
