package com.footbrawl.postgresapi.playervaluation;

import com.footbrawl.postgresapi.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
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
  public List<PlayerValuation> getPlayerValuation(@RequestParam int player_id){
    List<PlayerValuation> playersVal = playerValuationService.getPlayerValuation(player_id);
    if(playersVal!=null){
      for(PlayerValuation p : playersVal)
        p.setMarket_value(calculateMarket_value(p));
    }
    return playersVal;
  }

  public static int calculateMarket_value(PlayerValuation playersVal){
    String value = playersVal.getMarket_value_in_eur();
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

}
