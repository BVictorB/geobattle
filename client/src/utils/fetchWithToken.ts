interface Props {
  endpoint: string,
  token: string
}

const fetchWithToken = async ({ endpoint, token }: Props) => {
  const data = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })

  const result = await data.json()

  return result
}

export default fetchWithToken
