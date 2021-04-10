export interface UserInterface {
  id: string,
  username: string,
  points: number
}

export interface RoomInterface {
  _id: string,
  users: UserInterface[],
  name: string,
  rounds: number,
  time: number
}

export interface MessageInterface {
  user: string,
  text: string
}
