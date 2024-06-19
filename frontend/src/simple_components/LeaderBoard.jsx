import 'bootstrap/dist/css/bootstrap.min.css';

function LeaderBoard(props) {
  const rankings = props.rankings;

  return (
    <div>
      <div className="container">
        <h2 className="mt-4 mb-3">{rankings.length > 0 ? rankings[0].competition_name : 'Competition'}</h2>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Squadra</th>
            <th scope="col">Posizione</th>
          </tr>
          </thead>
          <tbody>
          {rankings.slice(0, 3).map((ranking) => (
            <tr key={ranking.ranking_id}>
              <td>{ranking.position}</td>
              <td>{ranking.club_name}</td>
              <td>{ranking.position}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
