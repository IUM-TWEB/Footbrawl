package com.footbrawl.postgresapi.clubranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * REST controller for managing club rankings.
 */
@RestController
@Tag(name = "Club Ranking Controller", description = "Operations related to club rankings")
public class ClubRankingController {

  private final ClubRankingService clubRankingService;

  /**
   * Constructor for ClubRankingController.
   *
   * @param clubRankingService the club ranking service
   */
  @Autowired
  public ClubRankingController(ClubRankingService clubRankingService) {
    this.clubRankingService = clubRankingService;
  }

  /**
   * Retrieves the last season ranking of a club by its name.
   *
   * @param name the name of the club
   * @return the ResponseEntity with status 200 (OK) and the list of ClubRanking if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get last season club ranking by club name", description = "Retrieve the last season ranking of a club by its name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved club ranking",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "404", description = "Club ranking not found")
  })
  /*Restituisce la posizione del club nell'ultima stagione'*/
  @GetMapping("/lastClubRankingByClubName")
  public ResponseEntity<List<ClubRanking>> getLastClubRanking(@Parameter(description = "Name of the club") @RequestParam String name) {
    List<ClubRanking> clubRankingList = clubRankingService.getLastClubRanking(name);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  /**
   * Retrieves the rankings of a club over different seasons by its name.
   *
   * @param name the name of the club
   * @return the ResponseEntity with status 200 (OK) and the list of ClubRanking if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get club rankings by club name", description = "Retrieve the rankings of a club over different seasons by its name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved club rankings",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "404", description = "Club rankings not found")
  })
  /*Restituisce la posizione del club nelle diverse stagioni*/
  @GetMapping("/clubRankingByClubName")
  public ResponseEntity<List<ClubRanking>> getClubRanking(@Parameter(description = "Name of the club") @RequestParam String name) {
    List<ClubRanking> clubRankingList = clubRankingService.getClubRanking(name);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  /**
   * Retrieves the last season ranking of a competition by its name.
   *
   * @param name the name of the competition
   * @return the ResponseEntity with status 200 (OK) and the list of ClubRanking if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get last season competition ranking by competition name", description = "Retrieve the last season ranking of a competition by its name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved competition ranking",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "404", description = "Competition ranking not found")
  })
  /*Restituisce la classifica del campionato dell'ultima stagione*/
  @GetMapping("/lastCompetitionRankingByCompetitionName")
  public ResponseEntity<List<ClubRanking>> getLastCompetitionRanking(@Parameter(description = "Name of the competition") @RequestParam String name) {
    List<ClubRanking> clubRankingList = clubRankingService.getLastCompetitionRanking(name);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  /**
   * Retrieves the last season ranking of a competition by its ID.
   *
   * @param id the ID of the competition
   * @return the ResponseEntity with status 200 (OK) and the list of ClubRanking if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get last season competition ranking by competition ID", description = "Retrieve the last season ranking of a competition by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved competition ranking",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "404", description = "Competition ranking not found")
  })
  /*Restituisce la classifica del campionato dell'ultima stagione*/
  @GetMapping("/lastCompetitionRankingByCompetitionId")
  public ResponseEntity<List<ClubRanking>> getLastCompetitionRankingById(@Parameter(description = "ID of the competition") @RequestParam String id) {
    List<ClubRanking> clubRankingList = clubRankingService.getLastCompetitionRankingById(id);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  /**
   * Retrieves the rankings of a competition over different seasons by its name.
   *
   * @param name the name of the competition
   * @return the ResponseEntity with status 200 (OK) and the list of ClubRanking if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get competition rankings by competition name", description = "Retrieve the rankings of a competition over different seasons by its name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved competition rankings",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "404", description = "Competition rankings not found")
  })
  /*Restituisce la classifica del campionato nelle diverse stagioni*/
  @GetMapping("/competitionRankingByCompetitionName")
  public ResponseEntity<List<ClubRanking>> getCompetitionRanking(@Parameter(description = "Name of the competition") @RequestParam String name) {
    List<ClubRanking> clubRankingList = clubRankingService.getCompetitionRanking(name);
    if (clubRankingList == null || clubRankingList.isEmpty()) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(clubRankingList);
    }
  }

  /**
   * Saves a new club ranking.
   *
   * @param clubRanking the ClubRanking entity to be saved
   * @return the ResponseEntity with status 201 (Created) and the saved ClubRanking
   */
  @Operation(summary = "Save a new club ranking", description = "Save a new club ranking")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Successfully saved club ranking",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubRanking.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid input")
  })
  @PostMapping("/saveClubRanking")
  public ResponseEntity<ClubRanking> saveClubRanking(@Parameter(description = "ClubRanking entity to be saved") @RequestParam ClubRanking clubRanking) {
    ClubRanking savedClubRanking = clubRankingService.saveClubRanking(clubRanking);
    return new ResponseEntity<>(savedClubRanking, HttpStatus.CREATED);
  }

}
