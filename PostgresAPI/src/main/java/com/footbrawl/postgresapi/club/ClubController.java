package com.footbrawl.postgresapi.club;

import com.footbrawl.postgresapi.player.PlayerController;
import com.footbrawl.postgresapi.player.Player;
import com.footbrawl.postgresapi.player.PlayerRepository;
import com.footbrawl.postgresapi.player.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.footbrawl.postgresapi.player.PlayerController.calculateMarket_value;

@RestController
public class ClubController {

  private final ClubService clubService;
  private final PlayerRepository playerRepository;

  @Autowired
  public ClubController(ClubService clubService, PlayerRepository playerRepository) {
    this.clubService = clubService;
    this.playerRepository = playerRepository;
  }

  @GetMapping("/club")
  public Club getClub(@RequestParam int id) { //@RequestBody
    Club club = clubService.getClub(id);
    if (club != null) {
      club.setNet_transfer_rec(calculateNet_transfer_record(club));
      club.setTotal_market_val(calculateTotal_market_val(club.getClub_id(), club.getLast_season()));
    }
    return club;
  }

  private int calculateTotal_market_val(long id, int lastSeason) { // qui prendo un long ma nella tabella players è un Integer
    List<Player> lista = playerRepository.findClubPlayersMVByCurrent_club_id(id, lastSeason).orElse(null);
    int tot = 0;
    int count = 0;
    if( lista == null) {
      return 0;
    }
    for (Player p : lista) {
      count++;
      System.out.println(p.getName() + ", " + p.getLast_season() + ", " + p.getPosition() + ", " + p.getAge());
      tot += calculateMarket_value(p);
    }
    System.out.println(count);
    return tot;
  }

  private int calculateNet_transfer_record(Club club) {
    String value = club.getNet_transfer_record();
    value = value.replaceAll("[^0-9km+-]", "");

    int netTransferRecord;
    if (value.isEmpty() || value.equals("+-")) {
      netTransferRecord = 0;
    } else {
      double multiplier = 1.0;
      if (value.endsWith("k")) {
        multiplier = 1000.0;
        value = value.substring(0, value.length() - 1);
      } else if (value.endsWith("m")) {
        multiplier = 1000000.0;
        value = value.substring(0, value.length() - 1);
      }

      double numericValue = Double.parseDouble(value) * multiplier;
      netTransferRecord = (int) numericValue;
    }

    return netTransferRecord;
  }

}
