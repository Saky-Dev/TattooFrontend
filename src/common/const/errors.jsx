class ConnectionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ConnectionError'
    this.stack = ''
    this.message = 'Ocurrió un error, revisa tu conexión'
  }
}

class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
    this.stack = ''
  }
}

class DataError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DataError'
    this.stack = ''
    this.message = 'Error en los datos del servidor, contacta a soporte técnico'
  }
}

export {
  ConnectionError,
  ValidationError,
  DataError
}
