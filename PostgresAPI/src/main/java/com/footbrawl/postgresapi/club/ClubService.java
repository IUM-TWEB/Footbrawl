package com.footbrawl.postgresapi.club;

import com.footbrawl.postgresapi.player.Player;
import com.footbrawl.postgresapi.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.footbrawl.postgresapi.utils.PlayerUtils.calculateMarketValueUtils;

@Service
public class ClubService {
  private final ClubRepository clubRepository;
  private final PlayerRepository playerRepository;

  @Autowired
  public ClubService(ClubRepository clubRepository, PlayerRepository playerRepository) {
    this.clubRepository = clubRepository;
    this.playerRepository = playerRepository;
  }

  public ClubDTO getClub(int id) {
    Club club = clubRepository.findClubByIdCustomQuery(id).orElse(null);
    if (club == null)
      return null;
    return convertToDTO(club);
  }

  public List<ClubDTO> getClubByName(String name) {
    List<Club> clubList = clubRepository.findClubByNameCustomQuery(name).orElse(null);
    if (clubList == null || clubList.isEmpty())
      return null;

    List<ClubDTO> clubDTOList = new ArrayList<>(clubList.size());
    for (Club club : clubList)
      clubDTOList.add(convertToDTO(club));

    return clubDTOList;
  }

  public List<Long> getAllClubIds() {
    return clubRepository.findAllClubIds();
  }

  public ClubDTO convertToDTO(Club club) {
    ClubDTO clubDTO = new ClubDTO();
    clubDTO.setClubId(club.getClub_id());
    clubDTO.setClubCode(club.getClub_code());
    clubDTO.setName(club.getName());
    clubDTO.setDomesticCompetitionId(club.getDomestic_competition_id());
    clubDTO.setSquadSize(club.getSquad_size());
    clubDTO.setAverageAge(club.getAverage_age());
    clubDTO.setForeignersNumber(club.getForeigners_number());
    clubDTO.setForeignersPercentage(club.getForeigners_percentage());
    clubDTO.setNationalTeamPlayers(club.getNational_team_players());
    clubDTO.setStadiumName(club.getStadium_name());
    clubDTO.setCoachName(club.getCoach_name());
    clubDTO.setLast_season(club.getLast_season());
    clubDTO.setUrl(club.getClub_code());
    clubDTO.setNetTransferRec(calculateNetTransferRecord(club));
    clubDTO.setTotalMarketVal(calculateTotalMarketVal(club.getClub_id(), club.getLast_season()));
    return clubDTO;
  }

  private int calculateTotalMarketVal(long id, int lastSeason) { // qui prendo un long ma nella tabella players è un Integer
    List<Player> lista = playerRepository.findClubPlayersMVByCurrent_club_id(id, lastSeason).orElse(null);
    int tot = 0;
    int count = 0;
    if (lista == null) {
      return 0;
    }
    for (Player p : lista) {
      count++;
      System.out.println(p.getName() + ", " + p.getLast_season() + ", " + p.getPosition() + ", " + p.getAge());
      tot += calculateMarketValueUtils(p.getMarket_value_in_eur());
    }
    System.out.println(count);
    return tot;
  }

  private int calculateNetTransferRecord(Club club) {
    String value = club.getNet_transfer_record();
    // Rimuovi prima i caratteri non desiderati per evitare di lasciare combinazioni non valide come "+-"
    value = value.replaceAll("[^0-9km+-]", "");

    // Aggiungi un controllo qui per "+-0" o qualsiasi altro caso speciale che vuoi gestire esplicitamente
    if (value.isEmpty() || value.equals("+-") || value.equals("+-0")) {
      return 0;
    }

    int netTransferRecord = 0;
    double multiplier = 1.0;
    if (value.endsWith("k")) {
      multiplier = 1000.0;
      value = value.substring(0, value.length() - 1);
    } else if (value.endsWith("m")) {
      multiplier = 10000.0;
      value = value.substring(0, value.length() - 1);
    }
    try {
      double numericValue = Double.parseDouble(value) * multiplier;
      netTransferRecord = (int) numericValue;
    } catch (NumberFormatException e) {
      // Log dell'errore o gestione dell'eccezione
      System.err.println("Impossibile analizzare il valore di trasferimento netto: " + club.getNet_transfer_record());
    }
    return netTransferRecord;
  }

}
