package com.footbrawl.postgresapi.playervaluation;

import com.footbrawl.postgresapi.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerValuationController {
  private final PlayerValuationService playerValuationService;

  @Autowired
  public PlayerValuationController(PlayerValuationService playerValuationService){
    this.playerValuationService = playerValuationService;
  }

  @GetMapping("/playerValuation")
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuation(@RequestParam int id){
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuation(id);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerValuationDTOList);
  }

  @GetMapping("/playerValuationByPlayerName")
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuation(@RequestParam String name){
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuationByPlayerName(name);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerValuationDTOList);
  }

}
