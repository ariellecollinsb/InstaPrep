const providers = ['google', 'github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `/auth/${provider}/callback`
    : `http://localhost:3001/auth/${provider}/callback`
})

const [googleURL, githubURL] = callbacks

exports.dbConfig = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI
:
  'mongodb://localhost:27017/InstaPrep'

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? '/'
  : ['http://127.0.0.1:3000', 'http://localhost:3000']


exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
}


exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
}