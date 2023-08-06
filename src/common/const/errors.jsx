class ConnectionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ConnectionError'
    this.stack = ''
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
  }
}

export {
  ConnectionError,
  ValidationError,
  DataError
}
