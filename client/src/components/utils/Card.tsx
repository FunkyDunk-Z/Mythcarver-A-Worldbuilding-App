import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCustomFetch } from '../../hooks/useCustomFetch'

import MyButton from './MyButton'

import styles from './css/Card.module.css'

type CardProps = {
  link?: string
  image: string
  cardName: string
  codexId?: string
  characterType?: string
  objectId?: string
}

function Card({
  link,
  image,
  cardName,
  codexId,
  objectId,
  characterType,
}: CardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { setIsLoading } = useAuthContext()
  const { customFetch } = useCustomFetch()
  const navigate = useNavigate()

  const handleView = () => {
    if (codexId) {
      localStorage.setItem('currentCodexId', codexId)
    }
    const linkUrl = link?.replace(/\s/g, '-').toLowerCase()

    if (linkUrl) {
      navigate(linkUrl)
    }
  }

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const handleDelete = (id: string | undefined) => {
    customFetch({
      credentials: true,
      requestType: 'DELETE',
      url: `characters/delete/${id}`,
    })
    setIsLoading(true)
    setConfirmDelete(false)
  }

  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={image} alt="image of category" />
      <div className={styles.cardDetails}>
        <p className={styles.cardName}>{cardName}</p>
        <p className={styles.characterType}>{characterType}</p>

        {!confirmDelete ? (
          <div className={styles.wrapperBtn}>
            <MyButton handleClick={handleView}>View</MyButton>
            <MyButton>Edit</MyButton>
            <MyButton handleClick={toggleConfirmDelete}>Delete</MyButton>
          </div>
        ) : (
          <div className={styles.wrapperConfirmDelete}>
            <MyButton handleClick={() => handleDelete(objectId)} theme="delete">
              Confirm Delete
            </MyButton>
            <MyButton handleClick={toggleConfirmDelete}>Cancel</MyButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
