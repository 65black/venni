import axios from 'axios'
import { UserProfile, GET_USER_PROFILE_SUCCESS } from 'src/redux/types'
import { getAllInvites } from '../invites/invitesActions'

export const getProfileSuccess = (profile: UserProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  profile
})

export const getProfileRequest = () => async (
  dispatch: any,
  getState: Function
): Promise<boolean> => {
  const url = `${process.env.REACT_APP_API_URL}/profile`
  const { token } = getState().auth

  return axios
    .get(url, { headers: { authorization: token } })
    .then(response => {
      dispatch(getProfileSuccess(response.data.data))
      dispatch(getAllInvites())
      return true
    })
    .catch(() => false)
}