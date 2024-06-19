package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {
  private final PlayerService playerService;

  @Autowired
  public PlayerController(PlayerService playerService) {
    this.playerService = playerService;
  }

  @GetMapping("/player")
  public ResponseEntity<PlayerDTO> getPlayer(@RequestParam int id) {
    PlayerDTO playerDTO = playerService.getPlayer(id);
    if (playerDTO == null) // gestire il caso quando player sia null
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTO);
  }

  @GetMapping("/playerByName")
  public ResponseEntity<List<PlayerDTO>> getPlayerByName(@RequestParam("name") String name) {
    List<PlayerDTO> playerDTOList = playerService.getPlayerByName(name);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @GetMapping("/playerByName2")
  public ResponseEntity<List<PlayerDTO>> getPlayerByName2(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName) {
    List<PlayerDTO> playerDTOList = playerService.getPlayerByName2(firstName, lastName);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @GetMapping("/playersOfClub")
  public ResponseEntity<List<PlayerDTO>> getPlayersByClubId(@RequestParam int id) {
    List<PlayerDTO> playerDTOList = playerService.getPlayersByClubId(id);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @GetMapping("/topMarketPlayerCompetition")
  public ResponseEntity<List<PlayerDTO>> getTopMarketPlayersByCompetitionId(@RequestParam String competitionId) {
    List<PlayerDTO> topMarketPlayerDTOList = playerService.getTopMarketPlayersByCompetitionId(competitionId);
    if (topMarketPlayerDTOList == null || topMarketPlayerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(topMarketPlayerDTOList);
  }

}
