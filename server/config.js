const providers = ['google', 'github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `http://localhost:3001/${provider}/callback`
    : `http://localhost:3001/${provider}/callback`
})

const [googleURL, githubURL] = callbacks

exports.dbConfig = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI
:
  'mongodb://localhost:27017/InstaPrep'

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3001'
  : ['http://127.0.0.1:3000', 'http://localhost:3000']

// exports.TWITTER_CONFIG = {
//   consumerKey: process.env.TWITTER_KEY,
//   consumerSecret: process.env.TWITTER_SECRET,
//   callbackURL: twitterURL,
// }

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
}

// exports.FACEBOOK_CONFIG = {
//   clientID: process.env.FACEBOOK_KEY,
//   clientSecret: process.env.FACEBOOK_SECRET,
//   profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
//   callbackURL: facebookURL
// }

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
}