const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'bd5299b02b1a4498b87282b201859803'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"));
}

const handleImage = (req,res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1) //Built in Knex function, can check doc
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}