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

  const test = await data.json()

  return test
}

export default fetchWithToken
