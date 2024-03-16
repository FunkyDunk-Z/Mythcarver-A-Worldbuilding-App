import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useDocFetch } from '../../../../hooks/useDocFetch'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import {
  abilitiyStats,
  senseStats,
  skillStats,
} from '../../../../data/CharacterStats'

import MyButton from '../../../../components/utils/MyButton'

import styles from './css/CreateCharacter.module.css'

interface PropTypes {
  selectType: string
}

function CreateCharacter({ selectType }: PropTypes) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { docFetch } = useDocFetch()
  const url = window.location.href.split('/')[3]
  const currentCodexId = localStorage.getItem('currentCodexId')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState('')
  const [formData, setFormData] = useState<CharacterType>({
    createdBy: user?.id,
    codex: currentCodexId,
    characterName: '',
    avatarURL: avatar,
    characterType: selectType,
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
    const { name, value, type, files } = e.target

    if (files && type === 'file') {
      const fileSelected = files[0]
      const fileReader = new FileReader()

      fileReader.readAsDataURL(fileSelected)

      fileReader.onloadend = () => {
        if (typeof fileReader.result === 'string') {
          const newAvatar = fileReader.result
          setAvatar(newAvatar)
          formData.avatarURL = newAvatar
        }
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleUpload = (e: InputEventType) => {
    e.preventDefault()
    fileInputRef.current?.click()
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
    proficiencyType: string
  ) => {
    const { checked } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.map((skill, i) =>
        i === index
          ? {
              ...skill,
              [proficiencyType]: checked,
            }
          : skill
      ),
    }))
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
      avatarURL: '',
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

  // console.log(formData)

  return (
    <div className={styles.wrapperPage}>
      <MyButton handleClick={handleNavigate}>Back to Characters</MyButton>
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
        <div className={styles.wrapperAvatar}>
          <label className={styles.label} htmlFor="avatarURL">
            Avatar
          </label>
          <input
            className={styles.input}
            type="file"
            name="avatarURL"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {avatar ? (
            <img
              className={`${styles.avatar} ${styles['preview']}`}
              src={formData.avatarURL}
              alt="Preview"
            />
          ) : null}
          <MyButton type="button" handleClick={handleUpload}>
            Upload
          </MyButton>
        </div>
        <div className={styles.wrapperHp}>
          <label className={styles.label} htmlFor="hitDie">
            Hit Die:
          </label>
          <input
            className={`${styles.input} ${styles['number']}`}
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
            className={`${styles.input} ${styles['number']}`}
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
                className={`${styles.input} ${styles['number']}`}
                type="number"
                name={el.abilityName}
                id={el.abilityName}
                autoComplete="off"
                value={
                  el.abilityScore < 10
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
              <div className={styles.wrapperProficiency}>
                <label htmlFor={`${el.skillName}1`}>Proficient?</label>
                <input
                  className={`${styles.input} ${styles['proficient']}`}
                  type="checkbox"
                  name={el.skillName}
                  id={`${el.skillName}1`}
                  autoComplete="off"
                  checked={el.isProficient}
                  onChange={(e) => handleSkillChange(e, i, 'isProficient')} // Toggle proficiency
                />
              </div>
            </div>
          ))}
        </div>

        <MyButton type="submit">Create</MyButton>
      </form>
    </div>
  )
}

export default CreateCharacter
