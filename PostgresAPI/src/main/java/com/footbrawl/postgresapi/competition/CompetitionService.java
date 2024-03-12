package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionService {
  @Autowired
  private CompetitionRepository competitionRepository;
}
