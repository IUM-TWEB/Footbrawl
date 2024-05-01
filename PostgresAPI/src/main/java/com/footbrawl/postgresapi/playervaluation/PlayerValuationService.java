package com.footbrawl.postgresapi.playervaluation;

import com.footbrawl.postgresapi.club.ClubRepository;
import com.footbrawl.postgresapi.competition.CompetitionRepository;
import com.footbrawl.postgresapi.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlayerValuationService {
  private final PlayerValuationRepository playerValuationRepository;
  private final PlayerRepository playerRepository;
  private final ClubRepository clubRepository;
  private final CompetitionRepository competitionRepository;

  @Autowired
  public PlayerValuationService(PlayerValuationRepository playerValuationRepository, PlayerRepository playerRepository, ClubRepository clubRepository, CompetitionRepository competitionRepository) {
    this.playerValuationRepository = playerValuationRepository;
    this.playerRepository = playerRepository;
    this.clubRepository = clubRepository;
    this.competitionRepository = competitionRepository;
  }

  public List<PlayerValuationDTO> getPlayerValuation(int id) {
    List<PlayerValuation> playerValuationList = playerValuationRepository.findPlayerValuationByIdCustomQuery(id).orElse(null);
    if (playerValuationList == null || playerValuationList.isEmpty())
      return null;

    Map<Integer, String> playerNameCache = new HashMap<>();
    Map<Integer, String> clubNameCache = new HashMap<>();
    Map<String, String> competitionNameCache = new HashMap<>();

    List<PlayerValuationDTO> playerValuationDTOList = new ArrayList<>(playerValuationList.size());
    for (PlayerValuation playerValuation : playerValuationList)
      playerValuationDTOList.add(convertToDTO(playerValuation, playerNameCache, clubNameCache, competitionNameCache));

    return playerValuationDTOList;
  }

  public List<PlayerValuationDTO> getPlayerValuationByPlayerName(String name) {
    Integer id = playerRepository.findPlayerIdByName(name).orElse(null);
    if (id == null)
      return null;

    List<PlayerValuation> playerValuationList = playerValuationRepository.findPlayerValuationByIdCustomQuery(id).orElse(null);
    if (playerValuationList == null || playerValuationList.isEmpty())
      return null;

    Map<Integer, String> playerNameCache = new HashMap<>();
    Map<Integer, String> clubNameCache = new HashMap<>();
    Map<String, String> competitionNameCache = new HashMap<>();

    List<PlayerValuationDTO> playerValuationDTOList = new ArrayList<>(playerValuationList.size());
    for (PlayerValuation playerValuation : playerValuationList)
      playerValuationDTOList.add(convertToDTO(playerValuation, playerNameCache, clubNameCache, competitionNameCache));

    return playerValuationDTOList;
  }

  public PlayerValuationDTO convertToDTO(PlayerValuation playerValuation, Map<Integer, String> playerNameCache, Map<Integer, String> clubNameCache, Map<String, String> competitionNameCache) {
    PlayerValuationDTO playerValuationDTO = new PlayerValuationDTO();

    playerNameCache.computeIfAbsent(playerValuation.getPlayer_id(), id -> playerRepository.findPlayerNameById(id).orElse(null));
    playerValuationDTO.setPlayerName(playerNameCache.get(playerValuation.getPlayer_id()));

    clubNameCache.computeIfAbsent(playerValuation.getCurrent_club_id(), id -> clubRepository.findClubNameById(id).orElse(null));
    playerValuationDTO.setCurrentClubName(clubNameCache.get(playerValuation.getCurrent_club_id()));

    competitionNameCache.computeIfAbsent(playerValuation.getPlayer_club_domestic_competition_id(), id -> competitionRepository.findCompetitionNameById(id).orElse(null));
    playerValuationDTO.setPlayerClubDomesticCompetitionName(competitionNameCache.get(playerValuation.getPlayer_club_domestic_competition_id()));

    playerValuationDTO.setLastSeason(playerValuation.getLast_season());
    playerValuationDTO.setDate(playerValuation.getDate());
    playerValuationDTO.setDateWeek(playerValuation.getDateweek());
    playerValuationDTO.setN(playerValuation.getN());
    playerValuationDTO.setMarketValue(calculateMarketValue(playerValuation));

    return playerValuationDTO;
  }

  public int calculateMarketValue(PlayerValuation playerValuation) {
    String value = playerValuation.getMarket_value_in_eur();
    if (value == null) {
      return -1;
    }
    String cleanMarketValue;
    if(value.contains("€")) {
      // Rimuovi il simbolo dell'euro e il separatore delle migliaia
      cleanMarketValue = value.replaceAll("[€.]", "");

      // Sostituisci il separatore decimale con un punto
      cleanMarketValue = cleanMarketValue.replace(',', '.');
    }else{
      cleanMarketValue = value.replaceAll("[$,]", "");
    }
    // Converte la stringa risultante in un numero intero
    double doubleValue = Double.parseDouble(cleanMarketValue);
    return (int) doubleValue;
  }

}
