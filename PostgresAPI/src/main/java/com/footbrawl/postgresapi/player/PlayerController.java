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
  public List<PlayerDTO> getPlayerByName(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName) {
    List<PlayerDTO> players = playerService.getPlayerByName(firstName, lastName);
    if (players == null) // gestire il caso quando player sia null
      return null;
    return players;
  }

  @GetMapping("/playersOfClub")
  public List<PlayerDTO> getPlayersByClubId(@RequestParam int id) {
    List<PlayerDTO> players = playerService.getPlayersByClubId(id);
    if (players == null) // gestire il caso quando la lista sia null
      return null;
    return players;
  }

  @PostMapping("/calculateAge")
  public Player calculateAge(@RequestBody Player player) {
    /*player.setAge(calcAge(player));
    player.setMarket_value(calculateMarket_value(player));
    player.setHighest_market_value(calculateHighest_market_value(player));*/
    return player;
  }

}
