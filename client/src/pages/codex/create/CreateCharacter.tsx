import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCustomFetch } from '../../../hooks/useCustomFetch'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { abilities, senses, skills } from '../../../data/CharacterStats'

import Select from '../../../components/utils/Select'
import MyButton from '../../../components/utils/MyButton'

import styles from './css/CreateCharacter.module.css'

function CreateCharacter() {
  const { user, currentCodexId } = useAuthContext()
  const navigate = useNavigate()
  const { customFetch } = useCustomFetch()
  const url = window.location.href.split('/')[3]

  const [formData, setFormData] = useState<CharacterType>({
    createdBy: user?.id,
    codex: currentCodexId,
    characterName: '',
    characterType: 'Npc',
    level: 1,
    abilities: abilities,
    skills: skills,
    senses: senses,
  })

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault()

    customFetch({
      credentials: true,
      requestType: 'POST',
      url: 'characters/create',
      dataToSend: formData,
    })

    setFormData({
      createdBy: user?.id,
      codex: currentCodexId,
      characterName: '',
      characterType: 'Npc',
      level: 1,
      abilities: abilities,
      skills: skills,
      senses: senses,
    })

    navigate(`/${url}/characters`)
  }

  //back button
  const handleNavigate = () => {
    navigate(`/${url}/characters`)
  }

  //select button
  const logOption = (e: string) => {
    console.log(e)
  }

  const selectOptions = ['Player', 'Npc']

  return (
    <div className={styles.wrapper}>
      <MyButton handleClick={handleNavigate} theme="backBtn">
        Back to Characters
      </MyButton>
      <Select options={selectOptions} handleChange={logOption} />
      <div className={styles.div}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="characterName">
            Character Name:
          </label>
          <input
            className={styles.input}
            type="text"
            name="characterName"
            id="characterName"
            autoComplete="off"
            value={formData.characterName}
            onChange={handleChange}
          ></input>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCharacter
