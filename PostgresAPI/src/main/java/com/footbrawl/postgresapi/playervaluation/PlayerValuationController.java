package com.footbrawl.postgresapi.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/playervaluation")
public class PlayerValuationController {
  private final PlayerValuationService playerValuationService;
  private final PlayerValuationRepository playerValuationRepository;

  @Autowired
  public PlayerValuationController(PlayerValuationService playerValuationService,
                                   PlayerValuationRepository playerValuationRepository) {
    this.playerValuationService = playerValuationService;
    this.playerValuationRepository = playerValuationRepository;
  }

  @GetMapping
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuation(@RequestParam int id) {
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuation(id);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(playerValuationDTOList);
  }

  @GetMapping("/byPlayerName")
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuationByName(@RequestParam String name) {
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuationByPlayerName(name);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(playerValuationDTOList);
  }

  @GetMapping("/top_market_value")
  public ResponseEntity<List<PlayerValuation>> getTopMarketValuePlayers(@RequestParam int competitionId) {
    List<PlayerValuation> players = playerValuationRepository.findTop15ByMarketValueInEurByCompetitionId(competitionId);
    if (players == null || players.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(players);
  }
}
