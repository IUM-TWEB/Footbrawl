let express = require('express');
let router = express.Router();
let axios = require('axios');
function extract(raw){
    const res_data = {
        'dates' : [],
        'goal_counts' : []
    }

    for( let i of raw){
        let int_date = parseInt((i.date).substring(0,4))
        if(!res_data.dates.includes(int_date)){
            res_data.dates.push(int_date)
            res_data.goal_counts.push(1)
        }
        const index_date = res_data.dates.indexOf(int_date)
        res_data.goal_counts[index_date] ++
    }
    return res_data
}
router.get('/goals_date/:player_id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3001/events/player_goals_date/${req.params.player_id}`);
        const res_data = extract(response.data);
        res.send(res_data);

    } catch (error) {
        console.error('Errore nella richiesta al server Spring Boot:', error);
        res.status(500).send('Errore nella richiesta al server Spring Boot');
    }

});

router.get('/assist_date/:player_id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3001/events/player_assist_date/${req.params.player_id}`);
        const res_data = extract(response.data);
        res.send(res_data);

    } catch (error) {
        console.error('Errore nella richiesta al server Spring Boot:', error);
        res.status(500).send('Errore nella richiesta al server Spring Boot');
    }

});



module.exports = router;
