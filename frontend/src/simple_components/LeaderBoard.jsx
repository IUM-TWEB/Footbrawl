import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function LeaderBoard(props) {
  const rankings = props.rankings;
  const navigate = useNavigate();

  const handleRowClick = (club_id) => {
    navigate(`/club/${club_id}`);
  };

  return (
    <div>
      <div className="container">
        <h2 className="mt-4 mb-3">{rankings.length > 0 ? rankings[0].competition_name : 'Competition'}</h2>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col"> </th>
            <th scope="col">Squadra</th>
          </tr>
          </thead>
          <tbody>
          {rankings.slice(0, 3).map((ranking) => (
            <tr key={ranking.ranking_id} onClick={() => handleRowClick(ranking.club_id)} style={{ cursor: 'pointer' }}>
              <td>{ranking.position}</td>
              <td>{ranking.club_name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
