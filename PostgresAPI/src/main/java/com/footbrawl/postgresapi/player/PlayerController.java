package com.footbrawl.postgresapi.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@Tag(name = "Player Controller", description = "Operations related to players")
public class PlayerController {
  private final PlayerService playerService;

  @Autowired
  public PlayerController(PlayerService playerService) {
    this.playerService = playerService;
  }

  @Operation(summary = "Get a player by ID", description = "Retrieve a player by their ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved player",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Player not found")
  })
  @GetMapping("/player")
  public ResponseEntity<PlayerDTO> getPlayer(@Parameter(description = "ID of the player to be retrieved") @RequestParam int id) {
    PlayerDTO playerDTO = playerService.getPlayer(id);
    if (playerDTO == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTO);
  }

  @Operation(summary = "Get players by name", description = "Retrieve players by their name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved players",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Players not found")
  })
  @GetMapping("/playerByName")
  public ResponseEntity<List<PlayerDTO>> getPlayerByName(@Parameter(description = "Name of the players to be retrieved") @RequestParam("name") String name) {
    List<PlayerDTO> playerDTOList = playerService.getPlayerByName(name);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @Operation(summary = "Get players by full name", description = "Retrieve players by their first and last name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved players",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Players not found")
  })
  @GetMapping("/playerByName2")
  public ResponseEntity<List<PlayerDTO>> getPlayerByName2(@Parameter(description = "First name of the players to be retrieved") @RequestParam("firstName") String firstName,
                                                          @Parameter(description = "Last name of the players to be retrieved") @RequestParam("lastName") String lastName) {
    List<PlayerDTO> playerDTOList = playerService.getPlayerByName2(firstName, lastName);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @Operation(summary = "Get players by club ID", description = "Retrieve players by their club ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved players",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Players not found")
  })
  @GetMapping("/playersOfClub")
  public ResponseEntity<List<PlayerDTO>> getPlayersByClubId(@Parameter(description = "ID of the club") @RequestParam int id) {
    List<PlayerDTO> playerDTOList = playerService.getPlayersByClubId(id);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @Operation(summary = "Get last season players by club ID", description = "Retrieve players of last season by their club ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved players",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Players not found")
  })
  @GetMapping("/playersOfClubLastSeason")
  public ResponseEntity<List<PlayerDTO>> getLastSeasonPlayersByClubId(@Parameter(description = "ID of the club") @RequestParam int id) {
    List<PlayerDTO> playerDTOList = playerService.getLastSeasonPlayersByClubId(id);
    if (playerDTOList == null || playerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(playerDTOList);
  }

  @Operation(summary = "Get top market players by competition ID", description = "Retrieve top market players by competition ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved players",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PlayerDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Players not found")
  })
  @GetMapping("/topMarketPlayerCompetition")
  public ResponseEntity<List<PlayerDTO>> getTopMarketPlayersByCompetitionId(@Parameter(description = "ID of the competition") @RequestParam String competitionId) {
    List<PlayerDTO> topMarketPlayerDTOList = playerService.getTopMarketPlayersByCompetitionId(competitionId);
    if (topMarketPlayerDTOList == null || topMarketPlayerDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(topMarketPlayerDTOList);
  }

}
