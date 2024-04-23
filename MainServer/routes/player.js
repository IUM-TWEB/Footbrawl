let express = require('express');
let router = express.Router();
let axios = require('axios');

router.get('/goals_date/:player_in', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3001/events/player_in/${req.params.player_in}`);
        const dati = response.data;

        const res_data = {
            'dates' : [],
            'goal_counts' : []
        }

        for( let i of dati){
            let int_date = parseInt((i.date).substring(0,4))
            if(!res_data.dates.includes(int_date)){
                res_data.dates.push(int_date)
                res_data.goal_counts.push(1)
            }
            const index_date = res_data.dates.indexOf(int_date)
            res_data.goal_counts[index_date] ++
        }
        console.log(res_data)
        res.send(res_data);

    } catch (error) {
        console.error('Errore nella richiesta al server Spring Boot:', error);
        res.status(500).send('Errore nella richiesta al server Spring Boot');
    }

});



module.exports = router;
