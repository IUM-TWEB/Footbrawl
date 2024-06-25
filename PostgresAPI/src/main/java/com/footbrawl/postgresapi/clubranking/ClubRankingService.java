package com.footbrawl.postgresapi.clubranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

/**
 * Service class for managing club rankings.
 */
@Service
public class ClubRankingService {

  private final ClubRankingRepository clubRankingRepository;

  /**
   * Constructor for ClubRankingService.
   *
   * @param clubRankingRepository the club ranking repository
   */
  @Autowired
  public ClubRankingService(ClubRankingRepository clubRankingRepository) {
    this.clubRankingRepository = clubRankingRepository;
  }

  /**
   * Retrieves the last season's ranking of a club by its name.
   *
   * @param name the name of the club
   * @return a list of ClubRanking if found, or null if not found
   */
  public List<ClubRanking> getLastClubRanking(String name) {
    return clubRankingRepository.findLastClubRankingByClubNameCustomQuery(name).orElse(null);
  }

  /**
   * Retrieves the rankings of a club over different seasons by its name.
   *
   * @param name the name of the club
   * @return a list of ClubRanking sorted by season if found, or null if not found
   */
  public List<ClubRanking> getClubRanking(String name) {
    List<ClubRanking> clubRankingList = clubRankingRepository.findClubRankingByClubNameCustomQuery(name).orElse(null);

    //ordino la lista delle posizioni per season crescente
    if (clubRankingList != null) {
      clubRankingList.sort(Comparator.comparingInt(ClubRanking::getSeason));
    }
    return clubRankingList;
  }

  /**
   * Retrieves the last season's ranking of a competition by its name.
   *
   * @param name the name of the competition
   * @return a list of ClubRanking sorted by position if found, or null if not found
   */
  public List<ClubRanking> getLastCompetitionRanking(String name) {
    List<ClubRanking> competitionRankingList = clubRankingRepository.findLastCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);

    //ordino la lista delle squadre per posizione crescente
    if (competitionRankingList != null) {
      competitionRankingList.sort(Comparator.comparingInt(ClubRanking::getPosition));
    }
    return competitionRankingList;
  }

  /**
   * Retrieves the last season's ranking of a competition by its ID.
   *
   * @param id the ID of the competition
   * @return a list of ClubRanking sorted by position if found, or null if not found
   */
  public List<ClubRanking> getLastCompetitionRankingById(String id) {
    List<ClubRanking> competitionRankingList = clubRankingRepository.findLastCompetitionRankingByCompetitionIdCustomQuery(id).orElse(null);

    //ordino la lista delle squadre per posizione crescente
    if (competitionRankingList != null) {
      competitionRankingList.sort(Comparator.comparingInt(ClubRanking::getPosition));
    }
    return competitionRankingList;
  }

  /**
   * Retrieves the rankings of a competition over different seasons by its name.
   *
   * @param name the name of the competition
   * @return a list of ClubRanking sorted by season and position if found, or null if not found
   */
  public List<ClubRanking> getCompetitionRanking(String name) {
    List<ClubRanking> rankingList = clubRankingRepository.findCompetitionRankingByCompetitionNameCustomQuery(name).orElse(null);

    //ordino la lista delle squadre per season crescente e per ogni season ordino le squadre per posizione crescente
    if (rankingList != null) {
      rankingList.sort(Comparator.comparingInt(ClubRanking::getSeason).thenComparingInt(ClubRanking::getPosition));
    }
    return rankingList;
  }

  /**
   * Saves a new club ranking.
   *
   * @param clubRanking the ClubRanking entity to be saved
   * @return the saved ClubRanking entity
   */
  public ClubRanking saveClubRanking(ClubRanking clubRanking) {
    return clubRankingRepository.save(clubRanking);
  }

}
