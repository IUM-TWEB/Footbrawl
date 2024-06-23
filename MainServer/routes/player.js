let express = require('express');
let router = express.Router();
let axios = require('axios');

function extract_values(raw) {
  const res_data = {
    'dates': [],
    'goal_counts': []
  };

  // Sort the data based on the year
  raw.sort((a, b) => {
    return parseInt(a.date.substring(0, 4)) - parseInt(b.date.substring(0, 4));
  });

  // Populate the res_data object
  let currentYear = null;
  let valuesForYear = [];

  for (let i of raw) {
    let int_date = parseInt(i.date.substring(0, 4));

    // Check if the year has changed
    if (currentYear !== int_date) {
      // Calculate the median for the previous year, if there are values
      if (valuesForYear.length > 0) {
        const median = calculateMedian(valuesForYear);
        res_data.goal_counts.push(median);
      }

      // Update currentYear and reset valuesForYear
      currentYear = int_date;
      valuesForYear = [];
      res_data.dates.push(currentYear);
    }

    // Accumulate values for the current year
    valuesForYear.push(i.marketValue);
  }

  // Calculate the median for the last year
  if (valuesForYear.length > 0) {
    const median = calculateMedian(valuesForYear);
    res_data.goal_counts.push(median);
  }

  console.log(res_data);
  return res_data;
}

function calculateMedian(values) {
  const sortedValues = values.sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
}

function extract(raw) {
  const res_data = {
    'dates': [],
    'goal_counts': []
  }

  for (let i of raw) {
    let int_date = parseInt((i.date).substring(0, 4))
    if (!res_data.dates.includes(int_date)) {
      res_data.dates.push(int_date)
      res_data.goal_counts.push(1)
    }
    const index_date = res_data.dates.indexOf(int_date)
    res_data.goal_counts[index_date]++
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

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8080/player?id=${req.params.id}`);
    res.send(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).send('Il main server non risponde');
  }
});

router.get('/market_value/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8080/playerValuation?id=${req.params.id}`);
    res.send(extract_values(response.data))
  } catch (err) {
    res.status(500).send('Errore nella richiesta al server Spring Boot');
  }
});

router.get('/player_clubs/:id', async (req, res) => {
  try {

    const response = await axios.get(`http://localhost:3001/events/player/${req.params.id}`);
    const clubs_id = []
    const data = {
      'clubs': []
    }
    for (let i of response.data) {
      if (!clubs_id.includes(i.club_id)) {
        try {
          const club_name = await axios.get(`http://localhost:8080/club?id=${i.club_id}`);
          if (club_name) {
            data.clubs.push(club_name.data.name);
            clubs_id.push(i.club_id);
          }
        } catch (e) {
        }

      }
    }
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.name)
  }
});

router.get('/games/:club_id/:competition/:season', async (req, res) => {
  console.log(req.params)
  const resp_db = await axios.get(`http://localhost:3001/games/${req.params.competition}/${req.params.season}/${req.params.club_id}`)
  res.send(resp_db.data)
});

router.get('/playersOfClubLastSeason/:current_club_id', async (req, res) => {
  const id = req.params.current_club_id;
  try {
    const response = await axios.get(`http://localhost:8080/playersOfClubLastSeason?id=${id}`);
    res.send(response.data)
  } catch (err) {
    res.status(500).send('Errore nella richiesta al server Spring Boot');
  }
});

module.exports = router;
