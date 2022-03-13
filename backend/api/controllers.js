const { create, getUsers, getUserById, updateUser, deleteUser, authentification } = require('./service');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt');

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
            const token = jwt.sign({ result: results}, 'secretkey', { expiresIn: '1h' });

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

    authentification(body.email, (error, results) => {

        if (error) {
            console.log(error);
        }

        if (!results) {
            return res.json({
                success: 0,
                data: 'Invalid email or password'
            })
        }

        const result = compareSync(body.password, results.password);

        if (result) {
            results.password = undefined;
            const token = jwt.sign({ result: results}, 'secretkey', { expiresIn: '1h' });
            return res.json({
                success: 1,
                message: 'Login successfully',
                token: token
            })
        } else {
            return res.json({
                success: 0,
                data: 'Invalid email or password'
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
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
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
    const data = req.params.id;
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