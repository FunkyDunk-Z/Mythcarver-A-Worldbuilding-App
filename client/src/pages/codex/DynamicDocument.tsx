import { useEffect, useState } from 'react'

// Components
import CharacterSheet from './categories/characters/CharacterSheet'
import LoadingPage from '../LoadingPage'

// Hooks
import { useDocFetch } from '../../hooks/useDocFetch'

// Css
import styles from './css/DynamicDocument.module.css'

type PropTypes = {
  categoryUrl: string
  docId: string
}

interface RenderType {
  docType: string
}

function DynamicDocument({ categoryUrl, docId }: PropTypes) {
  const [document, setDocument] = useState<CharacterType | null>(null)
  const { docFetch } = useDocFetch()

  useEffect(() => {
    const getDocument = async () => {
      try {
        const doc = await docFetch({
          requestType: 'GET',
          url: `/${categoryUrl}/${docId}`,
        })
        setDocument(doc)
      } catch (error) {
        console.error(error)
      }
    }
    getDocument()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryUrl, docId])

  // console.log(document)

  if (!document) {
    return <LoadingPage />
  }

  const RenderDocument = ({ docType }: RenderType) => {
    switch (docType) {
      case 'Character':
        return <CharacterSheet currentCharacter={document} />

      default:
        console.error('Invalid document type')
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* {renderDocument(document.commonProps.docType)} */}
      <RenderDocument docType={document.commonProps.docType} />
    </div>
  )
}

export default DynamicDocument
