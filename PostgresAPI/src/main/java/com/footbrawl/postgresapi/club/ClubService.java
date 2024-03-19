package com.footbrawl.postgresapi.club;

import com.footbrawl.postgresapi.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClubService {
  private final ClubRepository clubRepository;

  @Autowired
  public ClubService(ClubRepository clubRepository) {
    this.clubRepository = clubRepository;
  }

  public Club getClub(int id) {
    return clubRepository.findClubByIdCustomQuery(id).orElse(null);
  }

}
