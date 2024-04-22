import styles from './css/DynamicDocument.module.css'

type PropTypes = {
  docId: string
}

function DynamicDocument({ docId }: PropTypes) {
  return (
    <div className={styles.wrapper}>
      <p>DynamicDocument</p>
      <p>{docId}</p>
    </div>
  )
}

export default DynamicDocument
