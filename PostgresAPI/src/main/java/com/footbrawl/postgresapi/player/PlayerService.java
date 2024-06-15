package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.footbrawl.postgresapi.utils.PlayerUtils;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {
  private final PlayerRepository playerRepository;

  @Autowired
  public PlayerService(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
  }

  public PlayerDTO getPlayer(int id) {
    Player player = playerRepository.findPlayerByIdCustomQuery(id).orElse(null);
    if (player == null)
      return null;
    return convertToDTO(player);
  }

  public List<PlayerDTO> getPlayerByName(String name) {
    List<Player> playerList = playerRepository.findPlayerByNameCustomQuery(name).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

  public List<PlayerDTO> getPlayerByName2(String firstName, String lastName) {
    List<Player> playerList = playerRepository.findPlayerByName2CustomQuery(firstName, lastName).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

  public List<PlayerDTO> getPlayersByClubId(int id) {
    List<Player> playerList = playerRepository.findPlayersByCurrent_club_id(id).orElse(null);
    if (playerList == null || playerList.isEmpty())
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (Player player : playerList)
      playerDTOList.add(convertToDTO(player));

    return playerDTOList;
  }

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


  private int calcAge(Player player) {
    LocalDate today = LocalDate.now();
    if (player.getDate_of_birth() != null) {
      return Period.between(player.getDate_of_birth(), today).getYears();
    }
    return -1;
  }

  private int calculateMarketValue(Player player) {
    String value = player.getMarket_value_in_eur();
    return PlayerUtils.calculateMarketValueUtils(value);
  }

  private int calculateHighestMarketValue(Player player) {
    String value = player.getHighest_market_value_in_eur();
    return PlayerUtils.calculateMarketValueUtils(value);
  }
}
