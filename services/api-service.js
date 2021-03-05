import TokenService from './token-service'
import config from '../config'

const ApiService = {

  async getWorkouts() {
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
  },

  async addWorkout(name, day) {
    const newWorkout = {
      title: name,
      day: day,
    }
    return fetch(`${config.API_ENDPOINT}/workouts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newWorkout),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },

  async editWorkout(id, title, day) {
    const workoutToBeUpdated = {
      title: title,
      day: day,
    }
    return fetch(`${config.API_ENDPOINT}/workouts/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(workoutToBeUpdated),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
  },

  async deleteWorkout(id) {
    return fetch(`${config.API_ENDPOINT}/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
  },

  async getExercises() {
    return fetch(`${config.API_ENDPOINT}/exercises`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  async addExercise(exerciseId, workoutId) {
    const newWorkoutExercise = {
      workout_id: workoutId,
      exercise_id: exerciseId,
    }
    return fetch(`${config.API_ENDPOINT}/workout_exercises`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newWorkoutExercise),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },

  async getWorkoutExercises(id) {
    return fetch(`${config.API_ENDPOINT}/workouts/${id}/exercises`, {
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
  },

  async deleteWorkoutExercise(id) {
    return fetch(`${config.API_ENDPOINT}/workout_exercises/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
  },

  async getExerciseLog(id) {
    return fetch(`${config.API_ENDPOINT}/exercise_log/${id}`, {
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
  },

  async addLogEntry(id, set, rep, weight) {
    const newEntry = {
      set_count: set,
      rep_count: rep,
      weight_count: weight,
    }
    return fetch(`${config.API_ENDPOINT}/exercise_log/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newEntry),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },

  async deleteLogEntry(id) {
    return fetch(`${config.API_ENDPOINT}/exercise_log/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${await TokenService.getToken()}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res
      })
  },

  async login(username, password) {
    const login = {
      user_name: username,
      password: password,
    }
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(login),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },

  async register(fullName, username, password) {
    const newUser = {
      full_name: fullName,
      user_name: username,
      password: password,
    }
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  }

}

export default ApiService