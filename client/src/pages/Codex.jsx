import styles from './css/Codex.module.css'

import Card from '../components/utils/Card'

function Codex(props) {
  const cName = props.pageName ? styles[props.pageName] : ''
  return (
    <div className={` ${styles.container} ${cName}`}>
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Campaigns"
        link="campaigns"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Characters"
        link="characters"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Factions"
        link="factions"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Locations"
        link="locations"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Nations"
        link="nations"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
      <Card
        imgLink="https://picsum.photos/200/300/?random"
        cardName="Species"
        link="species"
      />
    </div>
  )
}

export default Codex
