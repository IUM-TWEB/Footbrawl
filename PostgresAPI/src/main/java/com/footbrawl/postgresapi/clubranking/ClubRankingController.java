package com.footbrawl.postgresapi.clubranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubRankingController {

  private final ClubRankingService clubRankingService;

  @Autowired
  public ClubRankingController(ClubRankingService clubRankingService) {
    this.clubRankingService = clubRankingService;
  }

  @GetMapping("/clubRankingByClubName")
  public ResponseEntity<List<ClubRanking>> getClubRanking(@RequestParam String name) {
    List<ClubRanking> clubRankingList = clubRankingService.getClubRanking(name);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  @PostMapping("/saveClubRanking")
  public ResponseEntity<ClubRanking> saveClubRanking(@RequestParam ClubRanking clubRanking) { //@RequestBody
    ClubRanking savedClubRanking = clubRankingService.saveClubRanking(clubRanking);
    return new ResponseEntity<>(savedClubRanking, HttpStatus.CREATED);
  }

}
