package com.footbrawl.postgresapi.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

/**
 * REST controller for managing player valuation related operations.
 */
@RestController
@Tag(name = "Player Valuation Controller", description = "Operations related to player valuations")
public class PlayerValuationController {

  private final PlayerValuationService playerValuationService;

  /**
   * Constructor for PlayerValuationController.
   *
   * @param playerValuationService the player valuation service
   */
  @Autowired
  public PlayerValuationController(PlayerValuationService playerValuationService) {
    this.playerValuationService = playerValuationService;
  }

  /**
   * Retrieves player valuation by player ID.
   *
   * @param id the ID of the player
   * @return the ResponseEntity with status 200 (OK) and the list of PlayerValuationDTO if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get player valuation by ID", description = "Retrieve player valuation by player ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved player valuation",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerValuationDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Player valuation not found")
  })
  @GetMapping("/playerValuation")
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuation(@Parameter(description = "ID of the player") @RequestParam int id) {
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuation(id);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerValuationDTOList);
  }

  /**
   * Retrieves player valuation by player name.
   *
   * @param name the name of the player
   * @return the ResponseEntity with status 200 (OK) and the list of PlayerValuationDTO if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get player valuation by name", description = "Retrieve player valuation by player name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved player valuation",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerValuationDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Player valuation not found")
  })
  @GetMapping("/playerValuationByPlayerName")
  public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuation(@Parameter(description = "Name of the player") @RequestParam String name) {
    List<PlayerValuationDTO> playerValuationDTOList = playerValuationService.getPlayerValuationByPlayerName(name);
    if (playerValuationDTOList == null || playerValuationDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerValuationDTOList);
  }

}
