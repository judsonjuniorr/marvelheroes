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
