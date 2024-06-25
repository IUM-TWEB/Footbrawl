package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
 * REST controller for managing competition-related operations.
 */
@RestController
@Tag(name = "Competition Controller", description = "Operations related to competitions")
public class CompetitionController {

  private final CompetitionService competitionService;

  /**
   * Constructor for CompetitionController.
   *
   * @param competitionService the competition service
   */
  @Autowired
  public CompetitionController(CompetitionService competitionService) {
    this.competitionService = competitionService;
  }

  /**
   * Retrieves a competition by its ID.
   *
   * @param id the ID of the competition to be retrieved
   * @return the ResponseEntity with status 200 (OK) and the CompetitionDTO if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get a competition by ID", description = "Retrieve a competition by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved competition",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = CompetitionDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Competition not found")
  })
  @GetMapping("/competition")
  public ResponseEntity<CompetitionDTO> getCompetition(@Parameter(description = "ID of the competition to be retrieved") @RequestParam String id) {
    CompetitionDTO competitionDTO = competitionService.getCompetition(id);
    if (competitionDTO == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(competitionDTO);
  }

  /**
   * Retrieves competitions by their name.
   *
   * @param name the name of the competitions to be retrieved
   * @return the ResponseEntity with status 200 (OK) and the list of CompetitionDTOs if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get competitions by name", description = "Retrieve competitions by their name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved competitions",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = CompetitionDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Competitions not found")
  })
  @GetMapping("/competitionByName")
  public ResponseEntity<List<CompetitionDTO>> getCompetitionByName(@Parameter(description = "Name of the competitions to be retrieved") @RequestParam String name) {
    List<CompetitionDTO> competitionDTOList = competitionService.getCompetitionByName(name);
    if (competitionDTOList == null || competitionDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(competitionDTOList);
  }

}
