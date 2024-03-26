import 'bootstrap/dist/css/bootstrap.min.css';


function LeaderBoard(props) {
  const competitions = props.competitions;
  const first = props.first;
  const second = props.second;
  const third = props.third;
  const firstValue = props.firstValue;
  const secondValue = props.secondValue;
  const thirdValue = props.thirdValue;

  return (
    <div>
      <div className="container">
        <h2 className="mt-4 mb-3">{competitions}</h2>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col">Squadra</th>
            <th scope="col">Punti</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{first}</td>
            <td>{firstValue}</td>
          </tr>
          <tr>
            <td>{second}</td>
            <td>{secondValue}</td>
          </tr>
          <tr>
            <td>{third}</td>
            <td>{thirdValue}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
