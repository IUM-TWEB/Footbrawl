package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionService {
  private final CompetitionRepository competitionRepository;

  @Autowired
  public CompetitionService(CompetitionRepository competitionRepository){
    this.competitionRepository = competitionRepository;
  }

  public Competition getCompetition(String id){
    return competitionRepository.findCompetitionByIdCustomQuery(id).orElse(null);
  }

}
