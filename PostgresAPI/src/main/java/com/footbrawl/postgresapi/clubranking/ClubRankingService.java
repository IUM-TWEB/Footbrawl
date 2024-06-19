package com.footbrawl.postgresapi.clubranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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
    List<ClubRanking> clubRankingList = clubRankingRepository.findClubRankingByClubNameCustomQuery(name).orElse(null);

    //ordino la lista delle posizioni per season crescente
    if (clubRankingList != null) {
      clubRankingList.sort(Comparator.comparingInt(ClubRanking::getSeason));
    }
    return clubRankingList;
  }

  public List<ClubRanking> getLastCompetitionRanking(String name) {
    List<ClubRanking> competitionRankingList = clubRankingRepository.findLastCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);

    //ordino la lista delle squadre per posizione crescente
    if (competitionRankingList != null) {
      competitionRankingList.sort(Comparator.comparingInt(ClubRanking::getPosition));
    }
    return competitionRankingList;
  }

  public List<ClubRanking> getLastCompetitionRankingById(String id) {
    List<ClubRanking> competitionRankingList = clubRankingRepository.findLastCompetitionRankingByCompetitionIdCustomQuery(id).orElse(null);

    //ordino la lista delle squadre per posizione crescente
    if (competitionRankingList != null) {
      competitionRankingList.sort(Comparator.comparingInt(ClubRanking::getPosition));
    }
    return competitionRankingList;
  }

  public List<ClubRanking> getCompetitionRanking(String name) {
    List<ClubRanking> rankingList = clubRankingRepository.findCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);

    //ordino la lista delle squadre per season crescente e per ogni season ordino le squadre per posizione crescente
    if (rankingList != null) {
      rankingList.sort(Comparator.comparingInt(ClubRanking::getSeason).thenComparingInt(ClubRanking::getPosition));
    }
    return rankingList;
  }

  public ClubRanking saveClubRanking(ClubRanking clubRanking) {
    return clubRankingRepository.save(clubRanking);
  }

}
