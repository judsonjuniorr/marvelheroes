export interface IParams {
  id: string
}

export interface ISerieInfo {
  title: string
  description?: string
  startYear: number
  endYear: number
  thumbnail: {
    path: string
    extension: string
  }
  characters: number
}

export interface ISerieRequest {
  data: {
    total: number
    results: {
      id: number
      title: string
      description?: string
      startYear: number
      endYear: number
      thumbnail: {
        path: string
        extension: string
      }
      characters: {
        available: number
      }
    }[]
  }
}
