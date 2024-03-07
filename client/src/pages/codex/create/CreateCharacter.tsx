import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCustomFetch } from '../../../hooks/useCustomFetch'
import { useAuthContext } from '../../../hooks/useAuthContext'
import {
  abilitiyStats,
  senseStats,
  skillStats,
} from '../../../data/CharacterStats'

import Select from '../../../components/utils/Select'
import MyButton from '../../../components/utils/MyButton'

import styles from './css/CreateCharacter.module.css'

function CreateCharacter() {
  const { user, currentCodexId } = useAuthContext()
  const navigate = useNavigate()
  const { customFetch } = useCustomFetch()
  const url = window.location.href.split('/')[3]
  const selectOptions = ['Player', 'Npc']
  const [formData, setFormData] = useState<CharacterType>({
    createdBy: user?.id,
    codex: currentCodexId,
    characterName: '',
    characterPortrait: '',
    characterType: '',
    level: 1,
    abilities: abilitiyStats,
    skills: skillStats,
    senses: senseStats,
  })

  const handleChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // set ability scores
  const handleAbilityChange = (e: InputEventType, index: number) => {
    const { value } = e.target
    let newValue = parseInt(value, 10) || 0
    newValue = Math.min(Math.max(newValue, 0), 20)
    setFormData((prevFormData) => ({
      ...prevFormData,
      abilities: prevFormData.abilities.map((ability, i) =>
        i === index ? { ...ability, abilityScore: newValue } : ability
      ),
    }))
  }

  //select button
  const logOption = (e: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      characterType: e,
    }))
  }

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault()

    customFetch({
      credentials: true,
      requestType: 'POST',
      url: 'characters/create',
      dataToSend: formData,
    }) // bring return the data
    // update the state of the user -> push the data into the user

    setFormData({
      createdBy: user?.id,
      codex: currentCodexId,
      characterName: '',
      characterPortrait: '',
      characterType: '',
      level: 1,
      abilities: abilitiyStats,
      skills: skillStats,
      senses: senseStats,
    })

    navigate(`/${url}/characters`)
  }

  //back button
  const handleNavigate = () => {
    navigate(`/${url}/characters`)
  }

  // console.log(formData)

  return (
    <div className={styles.wrapperPage}>
      <MyButton handleClick={handleNavigate} theme="backBtn">
        Back to Characters
      </MyButton>
      <Select options={selectOptions} handleChange={logOption} />
      {/* <div className={styles.wrapperForm}> */}
      <form onSubmit={handleSubmit} className={styles.wrapperForm}>
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
        <div className={styles.wrapperAbilities}>
          {formData.abilities.map((ability, index) => (
            <div className={styles.ability}>
              <label className={styles.label} htmlFor={ability.abilityName}>
                {ability.abilityName.charAt(0).toUpperCase() +
                  ability.abilityName.slice(1)}
                :
              </label>
              <input
                className={`${styles.input} ${styles['ability']}`}
                type="number"
                name={ability.abilityName}
                id={ability.abilityName}
                autoComplete="off"
                value={
                  ability.abilityScore < 9
                    ? ability.abilityScore.toString()
                    : ability.abilityScore
                }
                onChange={(e) => handleAbilityChange(e, index)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
      {/* </div> */}
    </div>
  )
}

export default CreateCharacter
