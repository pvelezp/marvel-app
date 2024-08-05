export interface Character {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}

interface Thumbnail {
  path: string
  extension: string
}

export interface Comics {
  available: number
  collectionURI: string
  items: ComicItem[]
  returned: number
}

interface ComicItem {
  resourceURI: string
  name: string
}

interface Series {
  available: number
  collectionURI: string
  items: SeriesItem[]
  returned: number
}

interface SeriesItem {
  resourceURI: string
  name: string
}

interface Stories {
  available: number
  collectionURI: string
  items: StoryItem[]
  returned: number
}

interface StoryItem {
  resourceURI: string
  name: string
  type: string
}

interface Events {
  available: number
  collectionURI: string
  items: EventItem[]
  returned: number
}

interface EventItem {
  resourceURI: string
  name: string
}

interface Url {
  type: string
  url: string
}

export interface Comic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: TextObject[]
  resourceURI: string
  urls: Url[]
  series: Series
  variants: any[] // Assuming variants is an empty array in this case, you can specify the type if needed
  collections: any[] // Assuming collections is an empty array
  collectedIssues: any[] // Assuming collectedIssues is an empty array
  dates: DateObject[]
  prices: Price[]
  thumbnail: Image
  images: Image[]
  creators: Creators
  characters: Characters
  stories: Stories
  events: Events
}

interface TextObject {
  type: string
  language: string
  text: string
}

interface Url {
  type: string
  url: string
}

interface Series {
  resourceURI: string
  name: string
}

interface DateObject {
  type: string
  date: string
}

interface Price {
  type: string
  price: number
}

interface Image {
  path: string
  extension: string
}

interface Creators {
  available: number
  collectionURI: string
  items: CreatorItem[]
  returned: number
}

interface CreatorItem {
  resourceURI: string
  name: string
  role: string
}

interface Characters {
  available: number
  collectionURI: string
  items: CharacterItem[]
  returned: number
}

interface CharacterItem {
  resourceURI: string
  name: string
}

interface Stories {
  available: number
  collectionURI: string
  items: StoryItem[]
  returned: number
}

interface StoryItem {
  resourceURI: string
  name: string
  type: string
}

interface Events {
  available: number
  collectionURI: string
  items: EventItem[]
  returned: number
}

interface EventItem {
  resourceURI: string
  name: string
}
