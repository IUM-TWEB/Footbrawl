package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
  private final PlayerRepository playerRepository;

  @Autowired
  public PlayerService(PlayerRepository playerRepository){
    this.playerRepository = playerRepository;
  }

  public Player savePlayer(Player player){
    return playerRepository.save(player);
    //return playerRepository.findByName(player.getFirst_name());
  }

  public Player getPlayer(int id) {
    //Optional<Player> player = playerRepository.findPlayerByIdCustomQuery(id);
    return playerRepository.findPlayerByIdCustomQuery(id).orElse(null);
    //return player.orElse(null);
  }

  public List<Player> getPlayerByName(String firstName, String lastName){
    return playerRepository.findPlayerByNameCustomQuery(firstName, lastName).orElse(null);
  }

  public List<Player> getPlayersByClubId(int id){
    return playerRepository.findPlayersByCurrent_club_id(id).orElse(null);
  }

  /*public int getAge(Player player){
    LocalDate today = LocalDate.now();
    /*
    LocalDate dob =  LocalDate.ofInstant(player.getDate_of_birth().toInstant(), java.time.ZoneId.systemDefault());
    int age = Period.between(dob, today).getYears();

    if(player.getDate_of_birth()!=null) {
      return Period.between(player.getDate_of_birth(), today).getYears();
    }
    return -1;
  }*/

}
