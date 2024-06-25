import React from "react";


const PopupPlayer = ({isOpen, player}) => {
  if(!isOpen) return null

  const overlayStyle = {
    position: 'absolute',    // Position absolutely to align under the <li>
    left: '50%',                 // Start at the left edge of the <li>
    backgroundColor: '#fff', // Set a background color
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: add a shadow for better visibility
    zIndex: 10, // Ensure it stacks above other content
    borderRadius: '2%',
    padding:'5px',
    top:'100%',
    // marginTop: '1em',        // Space between the button and the popup
    minWidth: '10%',        // Minimum width to match the button if the content is smaller
    whiteSpace: 'nowrap'     // Avoid wrapping content, thus extending width as needed
  };

  const formatValue = (value) => {
    return value === -1 ? 'non disponibile' : value + ' euro';
  };

  return (
    <div style={overlayStyle}>
      <div className="rounded-2">
        <div className="align-items-center">
          <div>
            <h3>{player.name}</h3>
          </div>
          <div className="border-2 ">
            <p>Età: {player.age} anni</p>
            <p>Altezza: {player.heightInCm} cm</p>
            <p>Nazionalità: {player.countryOfBirth}</p>
            <p>Squadra: {player.currentClubName}</p>
            <p>Ultima stagione: {player.lastSeason}</p>
            <p>Valore di mercato: {formatValue(player.marketValue)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupPlayer;