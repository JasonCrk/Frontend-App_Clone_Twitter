import axios from 'axios'

const API_TWITTER_USERS_BASE = 'http://localhost:4000/api/users'

const userApi = axios.create({
  baseURL: API_TWITTER_USERS_BASE,
})

export const updateProfile = async ({
  accountId,
  accountData,
  accessToken,
}: {
  accountId: string
  accountData: FormData
  accessToken: string
}): Promise<{ message: string }> => {
  const response = await userApi.patch<{ message: string }>(
    `/${accountId}`,
    accountData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return response.data
}
