const handleAuth = {
  authenLogin: passport => passport.authenticate('locals.login', { failureRedirect: '/user/login' }),
  authenSignup: passport => passport.authenticate('locals.signup', { failureRedirect: '/user/signup' }),
  authenProfile: passport => passport.authenticate('locals.profile', { failureRedirect: 'back' })
}
export const { authenLogin, authenSignup, authenProfile } = handleAuth