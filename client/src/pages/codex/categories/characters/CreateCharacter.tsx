import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDocFetch } from '../../../../hooks/useDocFetch'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import {
  abilitiyStats,
  senseStats,
  skillStats,
} from '../../../../data/CharacterStats'

import Select from '../../../../components/utils/Select'
import MyButton from '../../../../components/utils/MyButton'

import styles from './css/CreateCharacter.module.css'

function CreateCharacter() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { docFetch } = useDocFetch()
  const url = window.location.href.split('/')[3]
  const selectOptions = ['Player', 'Npc']
  const currentCodexId = localStorage.getItem('currentCodexId')
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
    healthPoints: {
      hitDie: 1,
      maxHP: 0,
    },
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

  // set skill proficiency
  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    proficiencyType: string // Pass proficiency type as an argument
  ) => {
    const { checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.map((skill, i) =>
        i === index
          ? {
              ...skill,
              [proficiencyType]: checked, // Toggle the specified proficiency type
            }
          : skill
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

    docFetch({
      credentials: true,
      requestType: 'POST',
      url: 'characters/create',
      dataToSend: formData,
    })

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
      healthPoints: {
        hitDie: 1,
        maxHP: 1,
      },
    })

    navigate(`/${url}/characters`)
  }

  //back button
  const handleNavigate = () => {
    navigate(`/${url}/characters`)
  }

  const handleHPChange = (e: InputEventType) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      healthPoints: {
        ...prevFormData.healthPoints,
        [name]: parseInt(value) || 0,
      },
    }))
  }

  return (
    <div className={styles.wrapperPage}>
      <MyButton handleClick={handleNavigate}>Back to Characters</MyButton>
      <Select options={selectOptions} handleChange={logOption} />
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
        <div className={styles.wrapperHP}>
          <label className={styles.label} htmlFor="hitDie">
            Hit Die:
          </label>
          <input
            className={styles.input}
            type="number"
            name="hitDie"
            id="hitDie"
            autoComplete="off"
            value={formData.healthPoints?.hitDie}
            onChange={handleHPChange}
          />

          <label className={styles.label} htmlFor="maxHP">
            Max HP:
          </label>
          <input
            className={styles.input}
            type="number"
            name="maxHP"
            id="maxHP"
            autoComplete="off"
            value={formData.healthPoints?.maxHP}
            onChange={handleHPChange}
          />
        </div>
        <div className={styles.wrapperAbilities}>
          {formData.abilities.map((el, i) => (
            <div key={i} className={styles.ability}>
              <label className={styles.label} htmlFor={el.abilityName}>
                {el.abilityName.charAt(0).toUpperCase() +
                  el.abilityName.slice(1)}
                :
              </label>
              <input
                className={`${styles.input} ${styles['ability']}`}
                type="number"
                name={el.abilityName}
                id={el.abilityName}
                autoComplete="off"
                value={
                  el.abilityScore < 9
                    ? el.abilityScore.toString()
                    : el.abilityScore
                }
                onChange={(e) => handleAbilityChange(e, i)}
              />
            </div>
          ))}
        </div>
        <div className={styles.wrapperAbilities}>
          {formData.skills.map((el, i) => (
            <div key={i} className={styles.ability}>
              <label className={styles.label} htmlFor={el.skillName}>
                {el.skillName.charAt(0).toUpperCase() + el.skillName.slice(1)}:
              </label>
              <input
                className={`${styles.input} ${styles['ability']}`}
                type="checkbox"
                name={el.skillName}
                id={el.skillName}
                autoComplete="off"
                checked={el.isProficient}
                onChange={(e) => handleSkillChange(e, i, 'isProficient')} // Toggle proficiency
              />
              <input
                className={`${styles.input} ${styles['ability']}`}
                type="checkbox"
                name={el.skillName}
                id={el.skillName}
                autoComplete="off"
                checked={el.hasDoubleProficiency}
                onChange={(e) =>
                  handleSkillChange(e, i, 'hasDoubleProficiency')
                } // Toggle double proficiency
              />
            </div>
          ))}
        </div>

        <MyButton type="submit">Create</MyButton>
        {/* <button type="submit">Create</button> */}
      </form>
    </div>
  )
}

export default CreateCharacter
