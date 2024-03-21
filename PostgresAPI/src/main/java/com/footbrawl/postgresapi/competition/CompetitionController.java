package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompetitionController {
  private final CompetitionService competitionService;

  @Autowired
  public CompetitionController(CompetitionService competitionService){
    this.competitionService = competitionService;
  }

  @GetMapping("/competition")
  public Competition getCompetition(@RequestParam String id){
    return competitionService.getCompetition(id);
  }

}
