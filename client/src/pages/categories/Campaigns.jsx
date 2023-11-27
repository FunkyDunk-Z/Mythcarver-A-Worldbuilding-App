import styles from './css/Campaigns.module.css'

function Campaigns(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <p>Campaigns</p>
    </div>
  )
}

export default Campaigns
