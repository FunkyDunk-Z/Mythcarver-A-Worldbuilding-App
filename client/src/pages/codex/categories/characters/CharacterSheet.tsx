import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useDocFetch } from '../../../../hooks/useDocFetch'

import MyButton from '../../../../components/utils/MyButton'
import Image from '../../../../assets/D&D.jpg'
import Anvil from '../../../../assets/anvil.png'

import styles from './css/CharacterSheet.module.css'

function CharacterSheet() {
  const { setIsLoading, user } = useAuthContext()
  const { docFetch } = useDocFetch()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [manage, setManage] = useState(false)
  const [currentHealth, setCurrentHealth] = useState(0)
  const navigate = useNavigate()
  const currentCodexId = localStorage.getItem('currentCodexId')
  const currentCodex = user?.codex.find((codex) => codex._id === currentCodexId)
  const id = localStorage.getItem('currentDocId')
  const [currentCharacter, setCurrentCharacter] =
    useState<CharacterType | null>(null)

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const toggleManage = () => {
    setManage(!manage)
  }

  useEffect(() => {
    const character = currentCodex?.characters.filter(
      (character) => character._id === id
    )
    if (character) {
      setCurrentCharacter(character[0])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id: string | null) => {
    docFetch({
      credentials: true,
      requestType: 'DELETE',
      url: `characters/delete/${id}`,
    })
    setIsLoading(true)
    setConfirmDelete(false)
    navigate(-1)
  }

  const ManageCharacter = () => {
    if (manage) {
      return (
        <div className={styles.btns}>
          {!confirmDelete ? (
            <>
              <MyButton handleClick={toggleManage}>Cancel</MyButton>
              <MyButton>Edit</MyButton>
              <MyButton handleClick={toggleConfirmDelete}>Delete</MyButton>
            </>
          ) : (
            <>
              <MyButton theme="delete" handleClick={() => handleDelete(id)}>
                Confirm
              </MyButton>
              <MyButton handleClick={toggleConfirmDelete}>Cancel</MyButton>
            </>
          )}
        </div>
      )
    } else {
      return (
        <div className={styles.btns}>
          <MyButton handleClick={toggleManage} theme="manage">
            <img className={styles.icon} src={Anvil} alt="image of an anvil" />
          </MyButton>
        </div>
      )
    }
  }

  useEffect(() => {
    if (currentCharacter) {
      setCurrentHealth(currentCharacter?.healthPoints.maxHP)
    }
  }, [currentCharacter])

  const reduceHealth = () => {
    if (currentHealth > 0) setCurrentHealth(currentHealth - 1)
  }
  const increaseHealth = () => {
    if (currentCharacter)
      if (currentHealth < currentCharacter?.healthPoints.maxHP) {
        setCurrentHealth(currentHealth + 1)
      }
  }

  const CharacterSheet = () => {
    if (currentCharacter) {
      const {
        characterName,
        avatarURL,
        healthPoints,
        species,
        characterClass,
        level,
        abilities,
        initiative,
        speed,
        proficiency,
        armourClass,
        skills,
        senses,
      } = currentCharacter

      return (
        <div className={styles.characterSheet}>
          <div className={styles.characterHeader}>
            <img
              className={styles.portrait}
              src={avatarURL ? avatarURL : Image}
              alt="Picture of character"
            />
            <ManageCharacter />
            <div className={styles.wrapperCharacterDetails}>
              <div className={styles.wrapperSubDetails}>
                <h1 className={styles.characterName}>{characterName}</h1>
                <div className={styles.healthPoints}>
                  <MyButton>
                    {/* HP */}
                    <h4>HP</h4>
                    <p>
                      {currentHealth}/{healthPoints?.maxHP}
                    </p>
                  </MyButton>
                  <MyButton handleClick={reduceHealth} theme="damage">
                    Damage
                  </MyButton>
                  <MyButton handleClick={increaseHealth} theme="heal">
                    Heal
                  </MyButton>
                </div>
              </div>
              <div className={styles.characterDetails}>
                <p className={styles.detail}>
                  {species ? species : 'Species Name'}
                </p>
                <p className={styles.detail}>
                  {characterClass ? characterClass : 'Class Name'}
                </p>
                <p className={styles.detail}>Level {level}</p>
              </div>
            </div>
          </div>

          <div className={styles.wrapperStats}>
            {/* ---Initiative--- */}
            <div className={styles.stat}>
              <p className={styles.statName}>Initiative</p>
              <p className={styles.statInfo}>+{initiative?.initiativeScore}</p>
            </div>
            {/* ---Speed--- */}
            <div className={styles.stat}>
              <p className={styles.statName}>Speed</p>
              <p className={styles.statInfo}>{speed?.walking}</p>
            </div>
            {/* ---Proficiency Bonus--- */}
            <div className={styles.stat}>
              <p className={styles.statName}>Proficiency</p>
              <p className={styles.statName}>Bonus</p>
              <p className={styles.statInfo}>+{proficiency}</p>
            </div>
            {/* ---Armor Class--- */}
            <div className={styles.stat}>
              <p className={styles.statName}>Armor</p>
              <p className={styles.statName}>Class</p>
              <p className={styles.statInfo}>{armourClass?.baseValue}</p>
            </div>
          </div>

          {/* ---Abilites--- */}
          <div className={styles.wrapperAbilities}>
            {abilities.map((el, i) => {
              const abilityName =
                el.abilityName.charAt(0).toUpperCase() + el.abilityName.slice(1)

              return (
                <div className={styles.ability} key={i}>
                  <p className={styles.abilityName}>{abilityName}</p>
                  <p className={styles.abilityMod}>+{el.abilityMod}</p>
                  <p className={styles.abilityScore}>{el.abilityScore}</p>
                </div>
              )
            })}
          </div>

          {/* ---Skills--- */}
          <div className={styles.wrapperSkills}>
            {skills.map((el, i) => {
              const skillName =
                el.skillName.charAt(0).toUpperCase() + el.skillName.slice(1)

              return (
                <div className={styles.skill} key={i}>
                  <span
                    className={
                      el.hasDoubleProficiency
                        ? `${styles.circle} ${styles['proficient']} ${styles['double']}`
                        : el.isProficient
                        ? `${styles.circle} ${styles['proficient']}`
                        : styles.circle
                    }
                  ></span>

                  <p className={styles.abilityName}>{skillName} :</p>
                  <p className={styles.skillMod}>+{el.skillMod}</p>
                </div>
              )
            })}
          </div>

          {/* ---Senses--- */}
          <div className={styles.wrapperSenses}>
            {senses.map((el, i) => {
              const senseName = el.senseName
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <div className={styles.sense} key={i}>
                  <p className={styles.senseName}>{senseName} :</p>
                  <p className={styles.senseMod}>{el.senseMod}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <CharacterSheet />
    </>
  )
}

export default CharacterSheet
