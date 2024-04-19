import { useAuthContext } from '../../hooks/useAuthContext'

import Image from '../../assets/Campaigns.webp'

import Card from '../../components/utils/Card'
// import Categories from '../../data/Categories'

import styles from './css/Codex.module.css'

function Codex() {
  const { user } = useAuthContext()
  const currentCodexId = localStorage.getItem('currentCodexId')
  const currentCodexIndex = user?.codex.findIndex(
    (el) => el?._id === currentCodexId
  )

  console.log(user?.codex[currentCodexIndex])

  // const RecentArray = () => {
  //   if (user && currentCodexIndex !== undefined) {
  //     return (
  //       <div className={styles.wrapperRecent}>
  //         {user.codex[currentCodexIndex].recent.map((el, i) => {
  //           // console.log(el.avatarURL)

  //           return (
  //             <div className={styles.recentDoc}>
  //               <Card
  //                 key={i}
  //                 cardName={el.characterName}
  //                 image={el.avatarURL}
  //                 link={el._id}
  //                 size="small"
  //               />
  //             </div>
  //           )
  //         })}
  //       </div>
  //     )
  //   }
  // }

  return (
    <>
      {/* <RecentArray /> */}
      <div className={styles.gallery}>
        {/* {Categories.map((el, i) => {
          const categoryName = el
            .toLowerCase()
            .replace(/'/g, '-')
            .replace(/\s/g, '-')
            .replace(/&/g, 'and')

          return (
            <Card key={i} cardName={el} image={Image} link={categoryName} />
          )
        })} */}
        {user?.codex.map((el, i) => {
          return <Card key={i} cardName={el.} image={Image} link={el} />
        })}
      </div>
    </>
  )
}

export default Codex
