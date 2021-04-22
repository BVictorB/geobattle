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
  time: number,
  coords: {
    coords: [number, number],
    city: string
  }[],
  round: number,
  timeleft: number
}

export interface MessageInterface {
  user: string,
  text: string
}

export interface AuthInterface {
  auth: boolean,
  token?: string,
  message?: string
}