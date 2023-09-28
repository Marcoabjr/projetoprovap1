/*Chamar as Dependencias */

require('dotenv').config()

/* Importações */

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

/* Execução do Express */

const app = express()

/*Configuração Json*/
app.use(express.json()) 

/*  Importação do model */

const User = require('./models/User')

/* Rota PUblica */

app.get('/',(req,res) => {
    res.status(200).json({msg:"Bem vindo a API de MARCO"})
})

/*Rota Registro Usuário*/

app.post('/auth/register', async(req,res) => {
    const {name, email, senha, confirmasenha} = req.body
      
    /* Validações */
    if(!name) {
        return res.status(422).json({ msg:'Nome Obtigatorio !!'})
    } 

    if(!email) {
        return res.status(422).json({ msg:'Email Obrigatorio !!'})
    } 

    if(!senha) {
        return res.status(422).json({ msg:' Senha Obrigatoria !!'})
    }
    
    if(senha !== confirmasenha ) {
        return res.status(422).json({ msg:' Senha Errada !!'})
    } 

    /* Chegar se o usuário existe  */

    const usuarioExiste = await User.findOne({ email: email })

    if(usuarioExiste) {
        return res.status(422).json({ msg:' Use Outro email !!'})
    }

    /* Criação de senha  */
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)

    /* Criação de usuário */

    const user = new User({
        name,
        email,
        senha: senhaHash,
    })

    try{
      
        await user.save()

        res.status(201).json({msg: 'Usuário criado com sucesso'})

    } catch(erro){
        res.status(500).json({msg: 'Erro de Servidor. Tente novamente mais tarde  '})
    }
})
  
/* Credenciais */

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wxmv5fz.mongodb.net/?retryWrites=true&w=majority`,)
    .then(() => {
    app.listen(3000)
    console.log('funcionou')
})
    .catch((err) => console.log(err))






