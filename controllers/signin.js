const handleSignin = (db, bcrypt) => (req,res) => {
    // Load hash from your password DB.
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission');
    }//Return is to stop following get run

    db.select('email', 'hash').from('login')
    .where('email', "=" , email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash); // true
        if(isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'))
        } else{
        res.status(400).json("Wrong Credentials")
        }
    })
    .catch(err=> res.status(400).json("Wrong Credentials"))
    
}

module.exports = {
    handleSignin: handleSignin
}