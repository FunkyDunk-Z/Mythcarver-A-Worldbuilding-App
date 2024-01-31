const Categories = [
  {
    categoryName: 'Campaigns',
  },
  {
    categoryName: 'Characters',
  },
  {
    categoryName: 'Factions',
  },
  {
    categoryName: 'Species',
  },
  {
    categoryName: 'Traits',
  },
  {
    categoryName: 'Nations',
  },
  {
    categoryName: 'Locations',
  },
  {
    categoryName: 'Items',
  },
  {
    categoryName: 'Bestairy',
  },
  {
    categoryName: 'History & Lore',
  },
]

const sortedCategories = Categories.sort((a, b) =>
  a.categoryName.localeCompare(b.categoryName)
)

export default sortedCategories
