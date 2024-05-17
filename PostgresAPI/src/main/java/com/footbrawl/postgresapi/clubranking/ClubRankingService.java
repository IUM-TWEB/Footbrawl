package com.footbrawl.postgresapi.clubranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubRankingService {

  private final ClubRankingRepository clubRankingRepository;

  @Autowired
  public ClubRankingService(ClubRankingRepository clubRankingRepository) {
    this.clubRankingRepository = clubRankingRepository;
  }

  public List<ClubRanking> getClubRanking(String name) {
    //List<ClubRanking> clubRankingList =
    return clubRankingRepository.findClubRankingByClubNameCustomQuery(name).orElse(null);
  }

  public ClubRanking saveClubRanking(ClubRanking clubRanking){
    return clubRankingRepository.save(clubRanking);
  }

}
