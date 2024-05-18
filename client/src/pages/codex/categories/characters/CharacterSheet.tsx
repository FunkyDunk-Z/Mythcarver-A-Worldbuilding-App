import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useDocFetch } from '../../../../hooks/useDocFetch'

import Image from '../../../../assets/D&D.jpg'
import Anvil from '../../../../assets/anvil.png'

import MyButton from '../../../../components/utils/MyButton'
import Slider from '../../../../components/utils/Slider'

import styles from './css/CharacterSheet.module.css'

interface PropTypes {
  currentCharacter: CharacterType
}

function CharacterSheet({ currentCharacter }: PropTypes) {
  const { setIsLoading } = useAuthContext()
  const { docFetch } = useDocFetch()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [manageCharacter, setManageCharacter] = useState(false)
  const [manageHp, setManageHp] = useState(false)
  const [currentHealth, setCurrentHealth] = useState(0)
  const navigate = useNavigate()

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const toggleManageCharacter = () => {
    setManageCharacter(!manageCharacter)
  }

  const toggleManageHp = () => {
    setManageHp(!manageHp)
  }

  const handleDelete = (id: string | null) => {
    docFetch({
      requestType: 'DELETE',
      url: `characters/delete/${id}`,
    })
    setIsLoading(true)
    setConfirmDelete(false)
    navigate(-1)
  }

  const ManageCharacter = () => {
    if (manageCharacter) {
      return (
        <div className={styles.manageCharacter}>
          {!confirmDelete ? (
            <>
              <MyButton handleClick={toggleManageCharacter}>Cancel</MyButton>
              <MyButton>Edit</MyButton>
              <MyButton handleClick={toggleConfirmDelete}>Delete</MyButton>
            </>
          ) : (
            <>
              <MyButton
                theme="delete"
                handleClick={() => handleDelete(currentCharacter._id)}
              >
                Confirm
              </MyButton>
              <MyButton handleClick={toggleConfirmDelete}>Cancel</MyButton>
            </>
          )}
        </div>
      )
    } else {
      return (
        <div className={styles.manageCharacter}>
          <MyButton handleClick={toggleManageCharacter} theme="manage">
            <img className={styles.icon} src={Anvil} alt="image of an anvil" />
          </MyButton>
        </div>
      )
    }
  }

  const ManageHp = () => {
    if (manageHp) {
      return (
        <div className={styles.healthPoints}>
          <MyButton theme="hp">
            <h4>HP</h4>
            <p>
              {currentHealth}/{currentCharacter?.healthPoints?.maxHP}
            </p>
          </MyButton>
          <MyButton handleClick={reduceHealth} theme="damage">
            Damage
          </MyButton>
          <MyButton handleClick={increaseHealth} theme="heal">
            Heal
          </MyButton>
          <MyButton handleClick={toggleManageHp} theme="close">
            Close
          </MyButton>
        </div>
      )
    } else {
      return (
        <div className={styles.manageHp}>
          <MyButton handleClick={toggleManageHp}>
            <p>
              Manage <br /> Hp
            </p>
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

  // console.log(currentCharacter)

  const RenderCharacter = () => {
    if (currentCharacter) {
      const { docName } = currentCharacter.commonProps
      const {
        avatarURL,
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
        description,
      } = currentCharacter

      const CharacterHeader = () => {
        return (
          <>
            <div className={styles.characterHeader}>
              <div className={styles.wrapperAvatar}>
                <img
                  className={styles.avatar}
                  src={avatarURL ? avatarURL : Image}
                  alt="Picture of character"
                />
                <ManageCharacter />
              </div>
              <div className={styles.wrapperDetails}>
                <h1 className={styles.characterName}>{docName}</h1>
                <ManageHp />
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
                <p className={styles.statInfo}>
                  +{initiative?.initiativeScore}
                </p>
              </div>
              {/* ---Speed--- */}
              <div className={styles.stat}>
                <p className={styles.statName}>Speed</p>
                <p className={styles.statInfo}>{speed?.walking}</p>
              </div>
              {/* ---Proficiency Bonus--- */}
              <div className={styles.stat}>
                <p className={styles.statName}>
                  Proficiency <br /> Bonus
                </p>
                {/* <p className={styles.statName}>Bonus</p> */}
                <p className={styles.statInfo}>+{proficiency}</p>
              </div>
              {/* ---Armor Class--- */}
              <div className={styles.stat}>
                <p className={styles.statName}>
                  Armor <br /> Class
                </p>
                {/* <p className={styles.statName}>Class</p> */}
                <p className={styles.statInfo}>{armourClass?.baseValue}</p>
              </div>
            </div>
          </>
        )
      }

      const CharacterAbilities = () => {
        return (
          <>
            <h2 className={styles.sectionTitle}>Abilities</h2>
            <div className={styles.wrapperAbilities}>
              {abilities.map((el, i) => {
                const abilityName =
                  el.abilityName.charAt(0).toUpperCase() +
                  el.abilityName.slice(1)

                return (
                  <div className={styles.ability} key={i}>
                    <p className={styles.abilityName}>{abilityName}</p>
                    <p className={styles.abilityMod}>
                      {el.abilityMod && el.abilityMod >= 0
                        ? `+${el.abilityMod}`
                        : [el.abilityMod]}
                    </p>
                    <p className={styles.abilityScore}>{el.abilityScore}</p>
                  </div>
                )
              })}
            </div>
          </>
        )
      }

      const SavingThrows = () => {
        return (
          <>
            <h2 className={styles.sectionTitle}>Saving Throws</h2>
            <div className={styles.wrapperSavingThrows}>
              {abilities.map((el, i) => {
                const abilityName = el.abilityName.slice(0, 3).toUpperCase()

                return (
                  <div className={styles.ability} key={i}>
                    <p className={styles.abilityName}>{abilityName}</p>
                    {el.savingThrow?.isProficient ? (
                      <p className={styles.savingAdvantage}>A</p>
                    ) : null}
                    <span
                      className={
                        el.savingThrow?.isProficient
                          ? `${styles.circle} ${styles['proficient']}`
                          : styles.circle
                      }
                    ></span>
                    <p className={styles.abilityMod}>
                      +{el.savingThrow?.savingThrowMod}
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )
      }

      const CharacterSenses = () => {
        return (
          <>
            <h2 className={styles.sectionTitle}>Passives</h2>
            <div className={styles.wrapperSenses}>
              {senses.map((el, i) => {
                const senseName = el.senseName
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')

                return (
                  <div className={styles.sense} key={i}>
                    <p className={styles.senseName}>{senseName}</p>
                    <p className={styles.senseMod}>{el.senseMod}</p>
                  </div>
                )
              })}
            </div>
          </>
        )
      }

      const CharacterSkills = () => {
        return (
          <>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.wrapperSkills}>
              {skills.map((el, i) => {
                const skillName =
                  el.skillName.charAt(0).toUpperCase() + el.skillName.slice(1)

                const skillMod =
                  el.skillMod < 0 ? el.skillMod : `+${el.skillMod}`

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

                    <p className={styles.skillName}>{skillName} :</p>
                    <p className={styles.skillMod}>
                      {skillMod ? skillMod : null}
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )
      }

      const Description = () => {
        const { appearance, personality } = description

        return (
          <>
            <h2 className={styles.sectionTitle}>Description</h2>
            <div className={styles.wrapperDescription}>
              <div className={styles.wrapperDescriptionSection}>
                <h3 className={styles.detailTitle}>Appearance</h3>
                {Object.entries(appearance || {}).map((el, i) => {
                  return (
                    <div className={styles.descriptionDetail} key={i}>
                      <h4>
                        {el[0].charAt(0).toUpperCase() + el[0].slice(1)} :
                      </h4>
                      <p>{el[1]}</p>
                    </div>
                  )
                })}
              </div>
              <div className={styles.wrapperDescriptionSection}>
                <h3 className={styles.detailTitle}>Personality</h3>
                {Object.entries(personality || {}).map((el, i) => {
                  return (
                    <div className={styles.descriptionDetail} key={i}>
                      <h4>
                        {el[0].charAt(0).toUpperCase() + el[0].slice(1)} :
                      </h4>
                      <p>{el[1]}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )
      }

      return (
        <div className={styles.characterSheet}>
          <CharacterHeader />
          <Slider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}>
            <>
              <CharacterAbilities />
              <SavingThrows />
              <CharacterSenses />
            </>
            <CharacterSkills />
            {description ? <Description /> : null}
          </Slider>
        </div>
      )
    }
  }

  return (
    <>
      <RenderCharacter />
    </>
  )
}

export default CharacterSheet
