function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

function destroyUserAuthSession(req, callback) {
  req.session.uid = null;
  req.session.passport = null;
  req.session.save(callback);
}

export { createUserSession, destroyUserAuthSession };
