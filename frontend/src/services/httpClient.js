//const BASE_URL = 'http://docketu.iutnc.univ-lorraine.fr:45555'
const BASE_URL = 'http://localhost:4000'
const request = async (
  endpoint,
  method = 'GET',
  baseUrl = true,
  body = null,
  isAuthRequest = false,
) => {
  // Définir les en-têtes
  const headers = {
    'Content-Type': 'application/json',
  }
  // Configurer la requête
  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  }
  try {
    // Envoyer la requête
    const url = baseUrl ? `${BASE_URL}${endpoint}` : endpoint
    const response = await fetch(url, config)
    if (response.status === 403 || response.status === 401) {
      // Token expired or invalid, remove token and redirect to login
      window.location.href = '/login'
      return
    }
    // Gérer la réponse
    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.message || 'Something went wrong')
    }
    // Vérifier si la réponse a du contenu
    const contentType = response.headers.get('content-type')
    return contentType && contentType.includes('application/json') ? await response.json() : null
  } catch (error) {
    // Gestion des erreurs
    console.error('API Error:', error)
    throw error
  }
}
const getSkills = () => {
  return request('/skills', 'GET')
}
const createSkill = (title, description) => {
  const body = {
    title: title,
    description: description,
  }
  return request('/skills', 'POST', true, body)
}

const deleteSkill = (skill_id) => {
  return request(`/skills/${skill_id}`, 'DELETE')
}

const createNeed = (customer_id, description, skill_id) => {
  const body = {
    customer_id: customer_id,
    description: description,
    skill_id: skill_id,
  }
  return request('/needs', 'POST', true, body)
}

const getUser = (email) => {
  const body = {
    email: email,
  }
  return request(`/login`, 'POST', true, body)
}

const getNeeds = () => {
  return request('/needs', 'GET')
}

const getNeedsCustomer = (customer_id) => {
  return request(`/needs/${customer_id}`, 'GET')
}

const createUser = (email, lastName, firstName, tel, skills) => {
  const body = { email: email, lastName: lastName, firstName: firstName, tel: tel, skills: skills }
  return request('/employees', 'POST', true, body)
}
export const getEmployees = () => {
  return request('/employees', 'GET')
}

const getGaleEtShapley = () => {
  return request('/galeEtShapley', 'GET')
}

const getGlouton = () => {
  return request('/glouton', 'GET')
}

const getBacktracking = () => {
  return request('/backtracking', 'GET')
}

export {
  getSkills,
  createSkill,
  createNeed,
  getUser,
  getNeeds,
  getNeedsCustomer,
  createUser,
  getEmployees,
  getGaleEtShapley,
  getGlouton,
  getBacktracking,
  deleteSkill,
}
