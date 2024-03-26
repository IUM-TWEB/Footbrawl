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
    //Optional<Player> player = playerRepository.findPlayerByIdCustomQuery(id);
    //return player.orElse(null);
  }

  public List<PlayerDTO> getPlayerByName(String firstName, String lastName) {
    List<Player> playerList = playerRepository.findPlayerByNameCustomQuery(firstName, lastName).orElse(null);
    if (playerList == null)
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (int i = 0; i < playerList.size(); i++)
      playerDTOList.add(i, convertToDTO(playerList.get(i)));

    return playerDTOList;
  }

  public List<PlayerDTO> getPlayersByClubId(int id) {
    List<Player> playerList = playerRepository.findPlayersByCurrent_club_id(id).orElse(null);
    if (playerList == null)
      return null;

    List<PlayerDTO> playerDTOList = new ArrayList<>(playerList.size());
    for (int i = 0; i < playerList.size(); i++)
      playerDTOList.add(i, convertToDTO(playerList.get(i)));

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
    // Rimuovi il simbolo dell'euro e il separatore delle migliaia
    String cleanMarketValue = value.replaceAll("[€.]", "");

    // Sostituisci il separatore decimale con un punto
    cleanMarketValue = cleanMarketValue.replace(',', '.');

    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanMarketValue);
    return (int) doubleValue;
  }

  private int calculateHighestMarketValue(Player player) {
    String value = player.getHighest_market_value_in_eur();
    if (value == null) {
      return -1;
    }
    // Rimuovi il simbolo dell'euro e il separatore delle migliaia
    String cleanHighestMarketValue = value.replaceAll("[€.]", "");

    // Sostituisci il separatore decimale con un punto
    cleanHighestMarketValue = cleanHighestMarketValue.replace(',', '.');

    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanHighestMarketValue);
    return (int) doubleValue;
  }

}
