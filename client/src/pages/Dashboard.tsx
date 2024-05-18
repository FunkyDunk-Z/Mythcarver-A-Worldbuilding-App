import { useNavigate } from 'react-router-dom'

import { useCodexContext } from '../hooks/useCodexContext'

import Card from '../components/utils/Card'
import MyButton from '../components/utils/MyButton'

import styles from './css/Dashboard.module.css'

interface I_RenderCard {
  arrayType: 'recent' | 'categories'
}

function Dashboard() {
  const { currentCodex } = useCodexContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/create-codex')
  }

  const RenderCard = ({ arrayType }: I_RenderCard) => {
    if (!currentCodex) {
      return null
    }
    const { recent, categories } = currentCodex

    if (arrayType === 'recent') {
      if (recent.length === 0) {
        return null
      } else {
        return (
          <div className={styles.slider}>
            {recent.map((el, i) => (
              <Card
                key={i}
                cardName={el.docName}
                image={el.thumbnail}
                link={`${el.categoryUrl}/${el.docId}`}
                docType={el.docType}
                docSubType={el?.docSubType}
              />
            ))}
          </div>
        )
      }
    }

    if (arrayType === 'categories') {
      return (
        <div className={styles.gallery}>
          {categories.map((el, i) => (
            <Card
              key={i}
              cardName={el.categoryName}
              image={el.thumbnail}
              link={el.categoryUrl}
            />
          ))}
        </div>
      )
    }
  }

  return (
    <div className={styles.wrapperPage}>
      <MyButton handleClick={handleNavigate}>Create New Codex</MyButton>
      <RenderCard arrayType="recent" />
      <RenderCard arrayType="categories" />
    </div>
  )
}

export default Dashboard
