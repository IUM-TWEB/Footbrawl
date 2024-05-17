package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompetitionController {
  private final CompetitionService competitionService;

  @Autowired
  public CompetitionController(CompetitionService competitionService){
    this.competitionService = competitionService;
  }

  @GetMapping("/competition")
  public ResponseEntity<CompetitionDTO> getCompetition(@RequestParam String id){
    CompetitionDTO competitionDTO = competitionService.getCompetition(id);
    if (competitionDTO == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(competitionDTO);
  }

  @GetMapping("/competitionByName")
  public ResponseEntity<List<CompetitionDTO>> getCompetitionByName(@RequestParam String name){
    List<CompetitionDTO> competitionDTOList = competitionService.getCompetitionByName(name);
    if (competitionDTOList == null || competitionDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(competitionDTOList);
  }

}
