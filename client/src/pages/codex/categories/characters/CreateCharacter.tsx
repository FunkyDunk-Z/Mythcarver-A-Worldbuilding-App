import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDocFetch } from '../../../../hooks/useDocFetch'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import {
  abilitiyStats,
  senseStats,
  skillStats,
} from '../../../../data/CharacterStats'

import MyButton from '../../../../components/utils/MyButton'
import ImageUploader from '../../../../components/utils/ImageUploader'
import Select from '../../../../components/utils/Select'

import styles from './css/CreateCharacter.module.css'

interface PropTypes {
  selectType: string
}

// MISSING FEATURES
// Description

function CreateCharacter({ selectType }: PropTypes) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { docFetch } = useDocFetch()
  const url = window.location.href.split('/')[3]
  const currentCodexId = localStorage.getItem('currentCodexId')
  const [avatar, setAvatar] = useState('')

  const speciesOptions = [
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Gnome',
    'Half-Elf',
    'Half-Orc',
    'Halfling',
    'Human',
    'Tiefling',
  ]
  const [speciesValue, setSpeciesValue] = useState<
    (typeof speciesOptions)[0] | undefined
  >('Choose a Species')

  const classOptions = [
    'Artificer',
    'Bard',
    'Barbarian',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
  ]
  const [classValue, setClassValue] = useState<
    (typeof classOptions)[0] | undefined
  >('Choose a Class')

  const levelOptions = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ]
  const [levelValue, setLevelValue] = useState<
    (typeof levelOptions)[0] | undefined
  >(levelOptions[0])

  const [formData, setFormData] = useState<CharacterType>({
    createdBy: user?.id,
    codex: currentCodexId,
    characterName: '',
    avatarURL: avatar,
    characterType: selectType,
    level: '1',
    abilities: abilitiyStats,
    skills: skillStats,
    senses: senseStats,
    healthPoints: {
      maxHP: 0,
    },
    species: speciesValue,
    characterClass: classValue,
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
  // const handleSkillChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number,
  //   proficiencyType: string
  // ) => {
  //   const { checked } = e.target
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     skills: prevFormData.skills.map((skill, i) =>
  //       i === index
  //         ? {
  //             ...skill,
  //             [proficiencyType]: checked,
  //           }
  //         : skill
  //     ),
  //   }))
  // }

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
      level: '1',
      abilities: abilitiyStats,
      skills: skillStats,
      senses: senseStats,
      healthPoints: {
        maxHP: 1,
      },
      species: '',
      characterClass: '',
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
      <div className={styles.backBtn}>
        <MyButton handleClick={handleNavigate}>Back to Characters</MyButton>
      </div>
      <form onSubmit={handleSubmit} className={styles.wrapperForm}>
        <div className={styles.sectionDetails}>
          <ImageUploader avatar={avatar} handleChange={handleChange} />
          <div className={styles.wrapperDetails}>
            <label className={styles.label} htmlFor="characterName">
              Character Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="characterName"
              id="characterName"
              autoComplete="off"
              spellCheck="false"
              value={formData.characterName}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className={styles.choose}>
          <Select
            selectName="Species"
            options={speciesOptions}
            value={speciesValue}
            onChange={(option) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                species: option,
              }))
              setSpeciesValue(option)
            }}
          />
          <Select
            selectName="Class"
            options={classOptions}
            value={classValue}
            onChange={(option) => {
              setClassValue(option)
              setFormData((prevFormData) => ({
                ...prevFormData,
                characterClass: option,
              }))
            }}
          />
          <div className={styles.chooseLevel}>
            <h3>Level</h3>
            <Select
              options={levelOptions}
              value={levelValue}
              theme="number"
              onChange={(option) => {
                setLevelValue(option)
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  level: option,
                }))
              }}
            />
            <div className={styles.wrapperHp}>
              <label className={styles.label} htmlFor="maxHP">
                HP:
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
          </div>
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
                value={el.abilityScore}
                onChange={(e) => handleAbilityChange(e, i)}
              />
            </div>
          ))}
        </div>
        {/* <div className={styles.wrapperAbilities}>
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
        </div> */}
        <div>
          <p>Description</p>
        </div>

        <MyButton type="submit">Create</MyButton>
      </form>
    </div>
  )
}

export default CreateCharacter
