package com.footbrawl.postgresapi.club;

import com.footbrawl.postgresapi.competition.CompetitionRepository;
import com.footbrawl.postgresapi.player.Player;
import com.footbrawl.postgresapi.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.footbrawl.postgresapi.utils.PlayerUtils.calculateMarketValueUtils;

/**
 * Service class for managing club-related operations.
 */
@Service
public class ClubService {

  private final ClubRepository clubRepository;
  private final PlayerRepository playerRepository;
  private final CompetitionRepository competitionRepository;

  /**
   * Constructor for ClubService.
   *
   * @param clubRepository the club repository
   * @param playerRepository the player repository
   * @param competitionRepository the competition repository
   */
  @Autowired
  public ClubService(ClubRepository clubRepository, PlayerRepository playerRepository, CompetitionRepository competitionRepository) {
    this.clubRepository = clubRepository;
    this.playerRepository = playerRepository;
    this.competitionRepository = competitionRepository;
  }

  /**
   * Retrieves a club by its ID.
   *
   * @param id the ID of the club
   * @return the ClubDTO representing the club, or null if not found
   */
  public ClubDTO getClub(int id) {
    Club club = clubRepository.findClubByIdCustomQuery(id).orElse(null);
    if (club == null)
      return null;
    return convertToDTO(club);
  }

  /**
   * Retrieves clubs by their name.
   *
   * @param name the name of the club
   * @return a list of ClubDTOs representing the clubs, or null if none found
   */
  public List<ClubDTO> getClubByName(String name) {
    List<Club> clubList = clubRepository.findClubByNameCustomQuery(name).orElse(null);
    if (clubList == null || clubList.isEmpty())
      return null;

    List<ClubDTO> clubDTOList = new ArrayList<>(clubList.size());
    for (Club club : clubList)
      clubDTOList.add(convertToDTO(club));

    return clubDTOList;
  }

  /**
   * Converts a Club entity to a ClubDTO.
   *
   * @param club the Club entity
   * @return the ClubDTO representing the club
   */
  public ClubDTO convertToDTO(Club club) {
    ClubDTO clubDTO = new ClubDTO();
    clubDTO.setClubId(club.getClub_id());
    clubDTO.setClubCode(club.getClub_code());
    clubDTO.setName(club.getName());
    String id = club.getDomestic_competition_id();
    clubDTO.setDomesticCompetitionId(id);
    clubDTO.setDomesticCompetitionName(competitionRepository.findCompetitionNameById(id).orElse(null));
    clubDTO.setSquadSize(club.getSquad_size());
    clubDTO.setAverageAge(club.getAverage_age());
    clubDTO.setForeignersNumber(club.getForeigners_number());
    clubDTO.setForeignersPercentage(club.getForeigners_percentage());
    clubDTO.setNationalTeamPlayers(club.getNational_team_players());
    clubDTO.setStadiumName(club.getStadium_name());
    clubDTO.setStadiumSeats(club.getStadium_seats());
    clubDTO.setCoachName(club.getCoach_name());
    clubDTO.setLast_season(club.getLast_season());
    clubDTO.setUrl(club.getUrl());
    clubDTO.setNetTransferRec(calculateNetTransferRecord(club));
    clubDTO.setTotalMarketVal(calculateTotalMarketVal(club.getClub_id(), club.getLast_season()));
    return clubDTO;
  }

  /**
   * Calculates the total market value of the club's players for a given season.
   *
   * @param id the ID of the club
   * @param lastSeason the last season year
   * @return the total market value of the club's players
   */
  private int calculateTotalMarketVal(long id, int lastSeason) { // qui prendo un long ma nella tabella players è un Integer
    List<Player> lista = playerRepository.findClubPlayersMVByCurrent_club_id(id, lastSeason).orElse(null);
    int tot = 0;
    if (lista == null) {
      return 0;
    }
    for (Player p : lista) {
      tot += calculateMarketValueUtils(p.getMarket_value_in_eur());
    }
    return tot;
  }

  /**
   * Calculates the net transfer record of the club.
   *
   * @param club the Club entity
   * @return the net transfer record
   */
  private int calculateNetTransferRecord(Club club) {
    String value = club.getNet_transfer_record();
    value = value.replaceAll("[^0-9km+-]", "");

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
      System.err.println("Impossibile analizzare il valore di trasferimento netto: " + club.getNet_transfer_record());
    }
    return netTransferRecord;
  }

}
