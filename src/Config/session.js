import expressSession from 'express-session'
import mongoDbstore from 'connect-mongodb-session'

function createSessionStore() {
  const MongoDBStore = mongoDbstore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    databaseName: "online-store",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

export { createSessionConfig};