package com.footbrawl.postgresapi.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerValuationService {
  @Autowired
  private PlayerValuationRepository playerValuationRepository;
}
