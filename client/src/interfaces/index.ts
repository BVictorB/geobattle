export interface User {
  id: string,
  username: string,
  points: number
}

export interface RoomData {
  _id: string,
  users: User[],
  name: string,
  rounds: number,
  time: number
}
