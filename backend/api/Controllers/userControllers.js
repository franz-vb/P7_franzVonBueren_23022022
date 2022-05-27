const { create, getUsers, getUserById, updateUser, deleteUser, authentification, countLikesComments } = require('../Services/userService');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.resToken = (req, res) => {

    return res.status(200).json({
        success: 1,
        message: 'Token successfully checked'
    })
}

exports.createUser = (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    
    create(body, (error, results) => {

        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: "Database connexion error"
            })
        } else {
            
            const token = jwt.sign({ result: results }, 'secretkey', { expiresIn: '1h' });

            return res.status(200).json({
                success: 1,
                data: results,
                token: token
            })
        }
    })
}

exports.authenticateUser = (req, res) => {
    const body = req.body;

    /* ICI on vérifie tout d'abord que l'email existe dans la table utilisateurs */ 
    authentification(body.email, (error, results) => {

        if (error) {
            console.log(error);
        }

        /* Si pas de results, cela signifie qu'on a pas trouvé d'email dans la table donc on renvoie une erreur */ 
        if (!results) {
            return res.json({
                success: 0,
                data: 'Invalid email'
            })
        }

        /* SI on arrive à cette étape cela signifie qu'on a trouvé un email */ 
        /* On doit donc vérifier que le mot de passe envoyé dans la requête (body.password) est égale à celui renvoyé par mysql qui est results.password*/ 

        /* ICI result va comparer les deux password et contiendra soit TRUE ou FALSE */ 
        const result = bcrypt.compareSync(body.password, results.password);

        /* SI les deux MDP sont égaux alors result = true, cela signifie qu'on peut se connecter et donc on renvoie côté front les datas suivantes */ 
        if (result) {
            results.password = undefined;
            const token = jwt.sign({ result: results }, 'secretkey', { expiresIn: '1h' });
            return res.json({
                success: 1,
                message: 'Login successfully',
                token: token,
                id: results.id,
                pseudo: results.pseudo
            })

        /* Si non cela signifie que le password n'est pas le même que celui crypté donc on renvoie un message d'erreur */ 
        } else {
            return res.json({
                success: 0,
                data: 'Invalid password'
            })
        }
    })
}

exports.getUserByUserId = (req, res) => {
    const id = req.params.id;

    getUserById(id, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }

        if (!results) {
            return res.status(500).json({
                success: 0,
                message: "Database connexion error"
            })
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.getUsers = (req, res) => {
    getUsers((error, results) => {
        if (error) {
            console.log(error);
            return;
        }
      
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.updateUser = (req, res) => {
    const body = {
        pseudo: req.body.pseudo,
        id: req.body.userId
    }
    
    updateUser(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.status(200).json({
            success: 1,
            message: 'updated successfully'
        })
    })
}

exports.deleteUser = (req, res) => {

    let data = {
        userId: req.body.userId,
        pseudo: req.body.pseudo

    }

    deleteUser(data, (err, results) => {

        if (err) {
            console.log(err);
            return;
        }
        if (results.affectedRows == 0) {
            return res.json({
                success: 0,
                message: 'User not found'
            })
        }
        else {
            return res.json({
                success: 1,
                message: 'User successfully deleted'
            })
        }
    })
}