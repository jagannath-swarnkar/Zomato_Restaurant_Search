var jwt = require('jsonwebtoken');
const nodemailer = require('./nodemailer');
const jwtDecode = require('jwt-decode')


module.exports = (users,knex)=>{
    users.post('/signup',(req,res)=>{
        if(req.body.password1 == req.body.password2){
        user={name : req.body.fullname,email : req.body.email,password : req.body.password1};
        var token = jwt.sign({user:user},'secrect-key',{expiresIn:'24h'});
        var message = '<p> click <a href="http://localhost:8000/confirmation?token=' + token + '">here</a> to confirm your email</p>'
        knex('user').insert({name:req.body.fullname, email:req.body.email, password:req.body.password1, status:'pending'})
        .then((status)=>{
            nodemailer.mailer(req.body.email,message);
            return res.send("Please visit your <a href='https://www.gmail.com'> email-address</a> to confirm this email")
        })
        .catch((err)=>{
            // console.log('err in inserting data into table in user.js file    ',err)
            return res.redirect('/signin');
        })
    }else{
        return res.send('Password did not match');
    }
    });

    users.get('/confirmation',(req,res)=>{
        var token = req.query.token;
        var data = jwtDecode(token);
        var user = data.user;
        knex('user').where('email',user.email).andWhere('password',user.password)
        .then((status)=>{
            if(status.length>0){
                knex('user').where('email',user.email).andWhere('password',user.password).update({status:'verified'})
                nodemailer.mailer(user.email,'Your email has verified successfully :')
                return res.redirect('/signin')
            }else{
                return res.send('email not verified')
            }
        })
        .catch((err)=>{
            console.log('err in confirming the mail    : ',err)
            return res.status(404)
        })
    })

    users.post('/login',(req,res)=>{
        knex.select('*').from ('user').where('email',req.body.email).andWhere('password',req.body.password).andWhere('status','verified')
        .then((data)=>{
            if(data.length>0){
                res.redirect('/zomatosearch')
            }else(
                res.send('<h2 style="color:red"> You entered Wrong Email and Password please try again</h2>')
            )
        })
        .catch((err)=>{
            res.send('<h2> You entered Wrong Email and Password please try again</h2>')
        })
    })

}