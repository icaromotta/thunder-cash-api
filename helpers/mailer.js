const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, '../public/mailer/mailer-template.html'), 'utf8')

module.exports.mailer = function () {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })
  const mailOptions = {
    from: process.env.MAIL_FROM
  }
  const send = (to, subject, html, attachment = false) => {
    return new Promise((resolve, reject) => {
      const options = {
        ...mailOptions,
        to,
        subject,
        html: template.replace('#body#', html)
      }

      if (attachment) {
        options.attachments = [
          attachment
        ]
      }
      transporter.sendMail(options, (error, info) => {
        if (error) {
          return console.log(error)
          reject(error)
        }
        console.log('Message sent: %s', info.messageId)
        resolve()
      })
    })
  }
  return {
    send
  }
}
