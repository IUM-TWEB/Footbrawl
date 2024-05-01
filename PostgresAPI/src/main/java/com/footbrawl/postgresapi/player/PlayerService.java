package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public Player savePlayer(Player player) {
    return playerRepository.save(player);
    //return playerRepository.findByName(player.getFirst_name());
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

  public PlayerDTO convertToDTO(Player player) {
    PlayerDTO playerDTO = new PlayerDTO();
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

  public static int calculateMarketValue(Player player) {
    String value = player.getMarket_value_in_eur();
    if (value == null) {
      return -1;
    }
    String cleanMarketValue;
    if (value.contains("€")) {
      // Rimuovi il simbolo dell'euro e il separatore delle migliaia
      cleanMarketValue = value.replaceAll("[€.]", "");

      // Sostituisci il separatore decimale con un punto
      cleanMarketValue = cleanMarketValue.replace(',', '.');
    } else {
      cleanMarketValue = value.replaceAll("[$,]", "");
    }
    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanMarketValue);
    return (int) doubleValue;
  }

  private int calculateHighestMarketValue(Player player) {
    String value = player.getHighest_market_value_in_eur();
    if (value == null) {
      return -1;
    }
    String cleanHighestMarketValue;
    if (value.contains("€")) {
      // Rimuovi il simbolo dell'euro e il separatore delle migliaia
      cleanHighestMarketValue = value.replaceAll("[€.]", "");

      // Sostituisci il separatore decimale con un punto
      cleanHighestMarketValue = cleanHighestMarketValue.replace(',', '.');
    } else {
      cleanHighestMarketValue = value.replaceAll("[$,]", "");
    }
    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanHighestMarketValue);
    return (int) doubleValue;
  }

}
