import TokenService from './token-service'
import config from '../config'

const ApiService = {
  getWorkouts() {
    return fetch(`${config.API_ENDPOINT}/workouts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await TokenService.getToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then((workouts) => {
        setWorkouts(workouts)
      })
      .catch(error => {
        console.error({ error })
      })
  }
}

export default ApiService