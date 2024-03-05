import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useCustomFetch } from '../../../../hooks/useCustomFetch'

import MyButton from '../../../../components/utils/MyButton'

import styles from './css/CharacterSheet.module.css'

function CharacterSheet() {
  const { setIsLoading } = useAuthContext()
  const { customFetch } = useCustomFetch()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

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
    navigate(-1)
  }
  return (
    <div className={styles.wrapper}>
      <p>CharacterSheet</p>
      <MyButton handleClick={toggleConfirmDelete}>
        {!confirmDelete ? 'Delete' : 'Cancel'}
      </MyButton>
      {confirmDelete ? (
        <MyButton handleClick={() => handleDelete(id)}>Confirm Delete</MyButton>
      ) : null}
    </div>
  )
}

export default CharacterSheet
