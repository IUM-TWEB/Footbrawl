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

  public List<ClubRanking> getLastClubRanking(String name) {
    return clubRankingRepository.findLastClubRankingByClubNameCustomQuery(name).orElse(null);
  }

  public List<ClubRanking> getClubRanking(String name) {
    //List<ClubRanking> clubRankingList =
    //ordinare la lista delle posizioni per season crescente
    return clubRankingRepository.findClubRankingByClubNameCustomQuery(name).orElse(null);
  }

  public List<ClubRanking> getLastCompetitionRanking(String name) {
    //ordinare la lista delle squadre per posizione crescente
    return clubRankingRepository.findLastCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);
  }

  public List<ClubRanking> getCompetitionRanking(String name) {
    //ordinare la lista delle squadre per season crescente e per ogni season ordinare le squadre per posizione crescente
    return clubRankingRepository.findCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);
  }

  public ClubRanking saveClubRanking(ClubRanking clubRanking){
    return clubRankingRepository.save(clubRanking);
  }

}
