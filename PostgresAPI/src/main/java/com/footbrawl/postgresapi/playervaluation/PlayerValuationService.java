package com.footbrawl.postgresapi.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerValuationService {
  private final PlayerValuationRepository playerValuationRepository;

  @Autowired
  public PlayerValuationService(PlayerValuationRepository playerValuationRepository){
    this.playerValuationRepository = playerValuationRepository;
  }

  public List<PlayerValuation> getPlayerValuation(int player_id){
    return playerValuationRepository.findPlayerValuationByIdCustomQuery(player_id).orElse(null);
  }

}
