export class Http {
  static HEADERS = { 'Content-Type': 'application/json' }

  static async get(url) {
    return request(url)
  }

  static async post(url, data = {}) {
    return request(url, 'POST', data)
  }

  static async delete(url) {
    return request(url, 'DELETE')
  }

  static async patch(url, data = {}) {
    return request(url, 'PATCH', data)
  }
}

async function request(url, method = 'GET', data) {
  const config = {
    method,
    headers: Http.headers
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, config)

    return await response.json()
  } catch (error) {
    throw error
  }
}
