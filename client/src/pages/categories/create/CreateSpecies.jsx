import styles from './css/CreateSpecies.module.css'

import CreateNewForm from '../../../components/forms/CreateNewForm'

function CreateSpecies() {
  const formData = {
    speciesName: '',
    size: '',
    speed: '',
    lifespan: '',
    articles: [
      {
        articleName: '',
        articleContent: '',
      },
    ],
  }
  const formSections = [
    {
      label: 'Species Name',
      inputId: 'speciesName',
      placeholder: 'speciesName',
      type: 'text',
    },
    {
      label: 'Speed',
      inputId: 'speed',
      placeholder: '30',
      type: 'number',
    },
    {
      label: 'Size',
      inputId: 'size',
      placeholder: 'Medium',
      type: 'text',
    },
    {
      label: 'Lifespan',
      inputId: 'lifespan',
      placeholder: '150 - 200 years',
      type: 'text',
    },
    // {
    //   label: 'Origins',
    //   inputId: 'origins',
    //   placeholder: 'Text here...',
    //   type: 'text',
    // },
    // {
    //   label: 'Appearance',
    //   inputId: 'appearance',
    //   placeholder: 'Text here...',
    //   type: 'text',
    // },
    {
      articles: [
        {
          label: 'Origins',
          inputId: 'origins',
          placeholder: 'Text here...',
          type: 'text',
        },
        {
          label: 'Appearance',
          inputId: 'appearance',
          placeholder: 'Text here...',
          type: 'text',
        },
      ],
    },
  ]

  return (
    <div className={` ${styles.container} ${styles['species']}`}>
      <CreateNewForm
        formName="Create Species"
        fetchPath="/species"
        formData={formData}
        formSections={formSections}
      />
    </div>
  )
}

export default CreateSpecies
