package com.footbrawl.postgresapi.player;

import com.footbrawl.postgresapi.clubranking.ClubRanking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.footbrawl.postgresapi.utils.PlayerUtils;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Service class for managing player operations.
 */
@Service
public class PlayerService {
  private final PlayerRepository playerRepository;

  /**
   * Constructor for PlayerService.
   *
   * @param playerRepository the player repository
   */
  @Autowired
  public PlayerService(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
  }

  /**
   * Retrieves a player by their ID.
   *
   * @param id the ID of the player
   * @return the PlayerDTO representing the player, or null if not found
   */
  public PlayerDTO getPlayer(int id) {
    Player player = playerRepository.findPlayerByIdCustomQuery(id).orElse(null);
    if (player == null)
      return null;
    return convertToDTO(player);
  }

  /**
   * Retrieves players by their name.
   *
   * @param name the name of the players
   * @return a list of PlayerDTOs representing the players, or null if none found
   */
  public List<PlayerDTO> getPlayerByName(String name) {
    List<Player> playerList = playerRepository.findPlayerByNameCustomQuery(name).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

  /**
   * Retrieves players by their first and last name.
   *
   * @param firstName the first name of the players
   * @param lastName  the last name of the players
   * @return a list of PlayerDTOs representing the players, or null if none found
   */
  public List<PlayerDTO> getPlayerByName2(String firstName, String lastName) {
    List<Player> playerList = playerRepository.findPlayerByName2CustomQuery(firstName, lastName).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

  /**
   * Retrieves players by their club ID.
   *
   * @param id the ID of the club
   * @return a list of PlayerDTOs representing the players, or null if none found
   */
  public List<PlayerDTO> getPlayersByClubId(int id) {
    List<Player> playerList = playerRepository.findPlayersByCurrent_club_id(id).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

  /**
   * Retrieves last season's players by their club ID.
   *
   * @param id the ID of the club
   * @return a list of PlayerDTOs representing the players, sorted by market value in descending order, or null if none found
   */
  public List<PlayerDTO> getLastSeasonPlayersByClubId(int id) {
    List<Player> playerList = playerRepository.findLastSeasonPlayersByCurrent_club_id(id).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));
    playerDTOList.sort(Comparator.comparingInt(PlayerDTO::getMarketValue).reversed());
    return playerDTOList;
  }

  /**
   * Retrieves top market players by their competition ID.
   *
   * @param competitionId the ID of the competition
   * @return a list of PlayerDTOs representing the top market players, or null if none found
   */
  public List<PlayerDTO> getTopMarketPlayersByCompetitionId(String competitionId) {
    List<Player> topMarketPlayers = playerRepository.findTopMarketPlayersByCompetitionId(competitionId);
    if (topMarketPlayers == null || topMarketPlayers.isEmpty()) {
      return null;
    }

    List<PlayerDTO> topMarketPlayerDTOList = new ArrayList<>(topMarketPlayers.size());
    for (Player player : topMarketPlayers) {
      topMarketPlayerDTOList.add(convertToDTO(player));
    }

    return topMarketPlayerDTOList;
  }

  /**
   * Converts a Player entity to a PlayerDTO.
   *
   * @param player the Player entity
   * @return the PlayerDTO representing the player
   */
  public PlayerDTO convertToDTO(Player player) {
    PlayerDTO playerDTO = new PlayerDTO();
    playerDTO.setPlayerId(player.getPlayer_id());
    playerDTO.setFirstName(player.getFirst_name());
    playerDTO.setLastName(player.getLast_name());
    playerDTO.setName(player.getName());
    playerDTO.setAge(calcAge(player));
    playerDTO.setMarketValue(calculateMarketValue(player));
    playerDTO.setHighestMarketValue(calculateHighestMarketValue(player));
    playerDTO.setLastSeason(player.getLast_season());
    playerDTO.setCurrentClubId(player.getCurrent_club_id());
    playerDTO.setCountryOfBirth(player.getCountry_of_birth());
    playerDTO.setDateOfBirth(player.getDate_of_birth());
    playerDTO.setPosition(player.getPosition());
    playerDTO.setFoot(player.getFoot());
    playerDTO.setHeightInCm(player.getHeight_in_cm());
    playerDTO.setImageUrl(player.getImage_url());
    playerDTO.setCurrentClubDomesticCompetitionId(player.getCurrent_club_domestic_competition_id());
    playerDTO.setCurrentClubName(player.getCurrent_club_name());
    return playerDTO;
  }

  /**
   * Calculates the age of a player.
   *
   * @param player the Player entity
   * @return the age of the player, or -1 if the date of birth is null
   */
  private int calcAge(Player player) {
    LocalDate today = LocalDate.now();
    if (player.getDate_of_birth() != null) {
      return Period.between(player.getDate_of_birth(), today).getYears();
    }
    return -1;
  }

  /**
   * Calculates the market value of a player.
   *
   * @param player the Player entity
   * @return the market value of the player
   */
  private int calculateMarketValue(Player player) {
    String value = player.getMarket_value_in_eur();
    return PlayerUtils.calculateMarketValueUtils(value);
  }

  /**
   * Calculates the highest market value of a player.
   *
   * @param player the Player entity
   * @return the highest market value of the player
   */
  private int calculateHighestMarketValue(Player player) {
    String value = player.getHighest_market_value_in_eur();
    return PlayerUtils.calculateMarketValueUtils(value);
  }
}
