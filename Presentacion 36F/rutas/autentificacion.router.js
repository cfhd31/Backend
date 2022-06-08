const express = require('express'),
bcrypt = require('bcrypt'),
passport = require('passport'),
passportLocal = require('passport-local'),
multer = require('multer'),
sendEmail = require('../notificaciones/emails/Registration/newUser');
const LocalStrategy = passportLocal.Strategy;

const UserDao = require('../src/DAOs/User.dao.mongo'),
newUser = new UserDao();
const autentificacionRuta = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(async (id, done) => {
  const user = await newUser.existUser(id);
  done(null, user);
});

function middleware(req, res, next) {
  let imageName;

  let uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      let originalname = file.originalname;
      let extension = originalname.split('.');
      filename = Date.now() + '.' + extension[extension.length - 1];

      cb(null, filename);
    },
  });

  let upload = multer({ storage: uploadStorage });
  let uploadFile = upload.single('avatar');
  uploadFile(req, res, function (err) {
    req.imageName = imageName;
    req.uploadError = err;

    next();
  });
}

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await newUser.existUser(email);
 
      if (user) {
        return done(
          null,
          false,
          req.flash('signupMessage', 'The Email is already Taken.')
        );
      } else {
        req.body.email = email;
        password = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(5),
          null
        );

       let phoneFull ="+"+req.body.country+req.body.phone;
        let newUserRegister = {
          email: email,
          password: password,
          phone: phoneFull,
          name: req.body.name,
          lastName: req.body.lastName,
          address: req.body.address,
          age: req.body.age,
          avatar: req.file.filename,
        };
        await newUser.guardar(newUserRegister);
        done(null, newUserRegister, sendEmail(newUserRegister));
      }
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await newUser.existUser(email);
      if (!user) {
        return done(null, false, req.flash('signinMessage', 'No User Found'));
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
          return done(null, user);
        } else {
          return done(
            null,
            false,
            req.flash('signinMessage', 'Incorrect Password')
          );
        }
      });
    }
  )
);

autentificacionRuta.get('/register', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/api/productos');
  }
  res.render('register', { title: 'Register', newUser: newUser });
});

autentificacionRuta.post(
  '/register',
  middleware,
  passport.authenticate('local-signup', {
    successRedirect: '/api/productos',
    failureRedirect: '/register',
  })
);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

autentificacionRuta.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile');
});

autentificacionRuta.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/api/productos');
  }
  res.render('login', { title: 'Log in' });
});

autentificacionRuta.post('/login', function (req, res, next) {
  passport.authenticate('local-signin', {
    successRedirect: '/api/productos',
    failureRedirect: '/login',
  })(req, res, next);
});

autentificacionRuta.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

module.exports = { autentificacionRuta, newUser };
