const handleRegister = (req,res, db, bcrypt)=> {
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }//Return is to stop following get run
    const hash = bcrypt.hashSync(password);

    // bcrypt.compareSync("bacon", hash); // true
    // bcrypt.compareSync("veggies", hash); // false
    db.transaction(trx => { //transaction help u do multi operation from one thing
        trx.insert({
            hash: hash,
            email: email,
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            db('users')
            .returning('*') //built in knex to return
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        }).then(trx.commit) //important to send data of trx
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("Unable to Register"))

}

module.exports = {
    handleRegister: handleRegister
};