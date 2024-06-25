package com.footbrawl.postgresapi.club;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
 * REST controller for managing club-related operations.
 */
@RestController
@Tag(name = "Club Controller", description = "Operations related to clubs")
public class ClubController {

  private final ClubService clubService;

  /**
   * Constructor for ClubController.
   *
   * @param clubService the club service
   */
  @Autowired
  public ClubController(ClubService clubService) {
    this.clubService = clubService;
  }

  /**
   * Retrieves a club by its ID.
   *
   * @param id the ID of the club
   * @return the ResponseEntity with status 200 (OK) and the ClubDTO if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get a club by ID", description = "Retrieve a club by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved club",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Club not found")
  })
  @GetMapping("/club")
  public ResponseEntity<ClubDTO> getClub(@Parameter(description = "ID of the club to be retrieved") @RequestParam int id) {
    ClubDTO clubDTO = clubService.getClub(id);
    if (clubDTO == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(clubDTO);
  }

  /**
   * Retrieves clubs by their name.
   *
   * @param name the name of the club
   * @return the ResponseEntity with status 200 (OK) and the list of ClubDTOs if found, or status 404 (Not Found) if not found
   */
  @Operation(summary = "Get clubs by name", description = "Retrieve clubs by their name")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved clubs",
          content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ClubDTO.class))}),
      @ApiResponse(responseCode = "404", description = "Clubs not found")
  })
  @GetMapping("/clubByName")
  public ResponseEntity<List<ClubDTO>> getClubByName(@Parameter(description = "Name of the clubs to be retrieved") @RequestParam String name) {
    List<ClubDTO> clubDTOList = clubService.getClubByName(name);
    if (clubDTOList == null || clubDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(clubDTOList);
  }

}
