//auth.controller.js

  exports.google = (req, res) => {
    req.session.save();
    const io = req.app.get('io');
    const user = { 
      ...req.user,
      provider: "google",
    }
    io.in(req.session.socketId).emit('google', user)
  }
  
  exports.github = (req, res) => {
    const io = req.app.get('io')
    const user = { 
      name: req.user.username,
      photo: req.user.photos[0].value,
      provider: "github",
      email: "",
      registered: req.user.registered
    }
    io.in(req.session.socketId).emit('github', user)
  } 