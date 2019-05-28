const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const User = mongoose.model("User");
const { mailer } = require("../helpers/mailer");

// Ctrl + k = 0 - minimiza blocos de codigo
const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
};
module.exports.register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res
        .status(406)
        .send({ error: "Este e-mail já está em uso. Tente outro." });
    }

    User.create(req.body, (err, user) => {
      let readyAuth = {
        email: user.email,
        token: generateToken({ _id: user._id })
      };

      return res.status(200).send(readyAuth);
    });
  });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(400).send({ error: "error" });
    }
    if (!user) {
      return res.status(401).send({
        error: `${email} não cadastrado!`
      });
    }

    user.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!isMatch) {
        return res.status(401).send({
          error: "Email ou senha inválidos!"
        });
      }

      return res.status(200).send({
        token: generateToken({ _id: user._id })
      });
    });
  });
};
module.exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (!user) {
      return res.status(404).send({ error: "Email não encontrado." });
    }

    let token = generateToken({ _id: user._id });

    mailer().send(
      user.email,
      "App - Redefinição de senha",
      `Acesse esse <a href="https://nos.com.br/admin/#/recuperar-senha/${token}">Link</a> para recuperar sua senha.`
    );

    //TODO: Aguardar resposta do envio de email
    return res.status(200).send({ token: "ok" });
  });
};
module.exports.resetPassword = (req, res) => {
  const { password } = req.body;

  User.findById(req._id, (err, user) => {
    if (err) {
      return res.status(400).send(err);
    }

    user.set({
      password: password,
      updatedAt: Date.now()
    });

    user.save(user => {
      res.status(200).send({ message: "Senha alterada." });
    });
  });
};
module.exports.createsVoluntaryProfile = (req, res) => {
  // if (err) { return res.status(400).send(err) }
  console.log(req._id);

  User.findById(req._id, (err, user) => {
    user.set({
      name: req.body.name,
      lastname: req.body.lastname,
      address: req.body.address,
      phone: req.body.phone,
      birthday: req.body.birthday,
      age: req.body.age,
      rg: req.body.rg,
      cpf: req.body.cpf,
      scholling: req.body.scholling,
      professionalQualification: req.body.professionalQualification,
      profession: req.body.profession,
      skills: req.body.skills,
      volunteerExperience: req.body.volunteerExperience,
      axes: req.body.axes,
      schedule: req.body.schedule,
      police: req.body.police,
      updatedAt: Date.now()
    });

    user.save(user => {
      res.status(200).send({ message: "Perfil construído." });
    });
  });
};
module.exports.addSchoolingVolunteer = (req, res) => {

  console.log(req.body);

  const schoolingItem = {
    schooling: req.scholling,       
    profession: req.body.profession,
    skills: req.body.skills
  }

  User.find({ _id: req._id }, (error, user) => {
    // TODO: logica para persistir escolaridade
    console.log(user);
  })
    
};
