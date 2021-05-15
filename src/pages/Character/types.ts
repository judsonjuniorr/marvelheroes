export interface IParams {
  id: string
}

export interface ILocation {
  name?: string
}

export interface ICharacter {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  series: {
    available: number
    collectionURI: string
    items: {
      resourceURI: string
      name: string
    }[]
  }
}

export interface ICharacterRequest {
  data: {
    count: number
    results: ICharacter[]
  }
}
