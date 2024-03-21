package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@RestController
public class PlayerController {
  private final PlayerService playerService;

  @Autowired
  public PlayerController(PlayerService playerService) {
    this.playerService = playerService;
  }

  @GetMapping("/player")
  public Player getPlayer(@RequestParam int id){
    Player player = playerService.getPlayer(id);
    if(player==null) // gestire il caso quando player sia null
      return null;
    player.setAge(calcAge(player));
    player.setMarket_value(calculateMarket_value(player));
    player.setHighest_market_value(calculateHighest_market_value(player));
    return player;
  }

  @GetMapping("/playerByName")
  public List<Player> getPlayerByName(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
    List<Player> players = playerService.getPlayerByName(firstName, lastName);
    if(players==null) // gestire il caso quando player sia null
      return null;
    for(Player p : players){
      p.setAge(calcAge(p));
      p.setMarket_value(calculateMarket_value(p));
      p.setHighest_market_value(calculateHighest_market_value(p));
    }
    return players;
  }

  @GetMapping("/playersOfClub")
  public List<Player> getPlayersByClubId(@RequestParam int id){
    List<Player> players = playerService.getPlayersByClubId(id);
    if(players==null) // gestire il caso quando la lista sia null
      return null;
    for(Player p : players){
      p.setAge(calcAge(p));
      p.setMarket_value(calculateMarket_value(p));
      p.setHighest_market_value(calculateHighest_market_value(p));
    }
    return players;
  }

  @PostMapping("/calculateAge")
  public Player calculateAge(@RequestBody Player player) {
    player.setAge(calcAge(player));
    player.setMarket_value(calculateMarket_value(player));
    player.setHighest_market_value(calculateHighest_market_value(player));
    return player;
  }

  private int calcAge(Player player){
    LocalDate today = LocalDate.now();
    if(player.getDate_of_birth()!=null) {
      return Period.between(player.getDate_of_birth(), today).getYears();
    }
    return -1;
  }

  public static int calculateMarket_value(Player player){
    String value = player.getMarket_value_in_eur();
    if(value == null){
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

  private int calculateHighest_market_value(Player player){
    String value = player.getHighest_market_value_in_eur();
    if(value == null){
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
