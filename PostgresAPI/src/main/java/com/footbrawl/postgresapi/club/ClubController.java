package com.footbrawl.postgresapi.club;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {

  private final ClubService clubService;


  @Autowired
  public ClubController(ClubService clubService) {
    this.clubService = clubService;
  }

  @GetMapping("/club")
  public ResponseEntity<ClubDTO> getClub(@RequestParam int id) { //@RequestBody
    ClubDTO clubDTO = clubService.getClub(id);
    if (clubDTO == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(clubDTO);
  }

  @GetMapping("/clubByName")
  public ResponseEntity<List<ClubDTO>> getClubByName(@RequestParam String name) { //@RequestBody
    List<ClubDTO> clubDTOList = clubService.getClubByName(name);
    if (clubDTOList == null || clubDTOList.isEmpty())
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(clubDTOList);
  }

}
