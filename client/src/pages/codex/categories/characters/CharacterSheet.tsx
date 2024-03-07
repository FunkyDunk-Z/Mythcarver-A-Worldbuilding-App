import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useCustomFetch } from '../../../../hooks/useCustomFetch'

import MyButton from '../../../../components/utils/MyButton'

import styles from './css/CharacterSheet.module.css'

function CharacterSheet() {
  const { setIsLoading } = useAuthContext()
  const { customFetch } = useCustomFetch()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const id = localStorage.getItem('currentDocId')
  // const [currentCharacter, setCurrentCharacter] = useState({})
  const character = localStorage.getItem('currentCharacter')

  useEffect(() => {
    customFetch({
      credentials: true,
      requestType: 'GET',
      url: `/characters/get/${id}`,
      authType: 'fetchDocument',
    })
  }, [])

  console.log(character)

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const handleDelete = (id: string | null) => {
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
      <MyButton handleClick={toggleConfirmDelete}>
        {!confirmDelete ? 'Delete' : 'Cancel'}
      </MyButton>
      {confirmDelete ? (
        <MyButton handleClick={() => handleDelete(id)}>Confirm Delete</MyButton>
      ) : null}
      <p>CharacterSheet</p>
      <div>{id ? <p>{id}</p> : null}</div>
    </div>
  )
}

export default CharacterSheet
