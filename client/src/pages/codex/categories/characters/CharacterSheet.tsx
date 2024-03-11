import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useDocFetch } from '../../../../hooks/useDocFetch'

import MyButton from '../../../../components/utils/MyButton'
import Checkbox from '../../../../components/utils/Checkbox'

import styles from './css/CharacterSheet.module.css'

function CharacterSheet() {
  const { setIsLoading, user } = useAuthContext()
  const { docFetch } = useDocFetch()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const currentCodexId = localStorage.getItem('currentCodexId')
  const currentCodex = user?.codex.find((codex) => codex._id === currentCodexId)
  const id = localStorage.getItem('currentDocId')
  const [currentCharacter, setCurrentCharacter] =
    useState<CharacterType | null>(null)

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
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

  const CharacterSheet = () => {
    if (currentCharacter) {
      const {
        characterName,
        characterType,
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
        <>
          <div className={styles.characterSheet}>
            {/* ---Name--- */}
            <h1>{characterName}</h1>

            <div className={styles.characterDetails}>
              {/* ---Type--- */}
              <p className={styles.detailType}>Character Type: </p>
              <p className={styles.detail}>{characterType}</p>

              {/* ---Species--- */}
              <p className={styles.detailType}>Character Species:</p>
              <p className={styles.detail}>
                {species ? species : 'Species Name'}
              </p>

              {/* ---Class--- */}
              <p className={styles.detailType}>Character Class:</p>
              <p className={styles.detail}>
                {characterClass ? characterClass : 'Class Name'}
              </p>

              {/* ---Level--- */}
              <p className={styles.detailType}>Character Level:</p>
              <p className={styles.detail}>{level}</p>
            </div>

            {/* ---Stats--- */}
            <div className={styles.wrapperStats}>
              {/* ---Initiative--- */}
              <div className={styles.ability}>
                <p className={styles.detailType}>Initiative</p>
                <p className={styles.abilityMod}>
                  +{initiative?.initiativeScore}
                </p>
              </div>
              {/* ---Speed--- */}
              <div className={styles.ability}>
                <p className={styles.detailType}>Speed</p>
                <p className={styles.abilityMod}>{speed?.walking}</p>
              </div>
              {/* ---Proficiency Bonus--- */}
              <div className={styles.ability}>
                <p className={styles.detailType}>Proficiency Bonus</p>
                <p className={styles.abilityMod}>+{proficiency}</p>
              </div>
              {/* ---Armor Class--- */}
              <div className={styles.ability}>
                <p className={styles.detailType}>Armor Class</p>
                <p className={styles.abilityMod}>{armourClass?.baseValue}</p>
              </div>
            </div>

            {/* ---Abilites--- */}
            <div className={styles.wrapperAbilities}>
              {abilities.map((el, i) => {
                const abilityName =
                  el.abilityName.charAt(0).toUpperCase() +
                  el.abilityName.slice(1)

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
                    <div className={styles.checkbox}>
                      {el.isProficient ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}
                    </div>
                    <p className={styles.abilityName}>{skillName} :</p>
                    <p className={styles.skillMod}>+{el.skillMod}</p>
                  </div>
                )
              })}
            </div>

            {/* ---Senses--- */}
            <div className={styles.wrapperSkills}>
              {senses.map((el, i) => {
                const senseName =
                  el.senseName.charAt(0).toUpperCase() + el.senseName.slice(1)

                return (
                  <div className={styles.skill} key={i}>
                    <p className={styles.abilityName}>{senseName} :</p>
                    <p className={styles.skillMod}>{el.senseMod}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className={styles.wrapperPage}>
      <div className={styles.btns}>
        {!confirmDelete ? (
          <>
            <MyButton>Edit</MyButton>
            <MyButton handleClick={toggleConfirmDelete}>Delete</MyButton>
          </>
        ) : (
          <>
            <MyButton theme="delete" handleClick={() => handleDelete(id)}>
              Confirm Delete
            </MyButton>
            <MyButton handleClick={toggleConfirmDelete}>Cancel</MyButton>
          </>
        )}
      </div>
      <>
        <CharacterSheet />
      </>
    </div>
  )
}

export default CharacterSheet
