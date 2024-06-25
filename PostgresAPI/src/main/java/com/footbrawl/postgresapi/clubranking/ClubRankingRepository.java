package com.footbrawl.postgresapi.clubranking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for ClubRanking entities.
 */
@Repository
public interface ClubRankingRepository extends JpaRepository<ClubRanking, Long> {

  /**
   * Custom query to find the last season's club ranking by club name.
   *
   * @param name the name of the club
   * @return an Optional containing a list of ClubRanking if found, or empty if not found
   */
  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(club_name) LIKE LOWER(CONCAT('%', :name, '%')) AND season = 2023", nativeQuery = true)
  Optional<List<ClubRanking>> findLastClubRankingByClubNameCustomQuery(String name);

  /**
   * Custom query to find the club rankings by club name.
   *
   * @param name the name of the club
   * @return an Optional containing a list of ClubRanking if found, or empty if not found
   */
  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(club_name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
  Optional<List<ClubRanking>> findClubRankingByClubNameCustomQuery(String name);

  /**
   * Custom query to find the last season's competition ranking by competition name.
   *
   * @param name the name of the competition
   * @return an Optional containing a list of ClubRanking if found, or empty if not found
   */
  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(competition_name) LIKE LOWER(CONCAT('%', :name, '%')) AND season = 2023", nativeQuery = true)
  Optional<List<ClubRanking>> findLastCompetitionRankingByCompetitionNameCustomQuery(String name);

  /**
   * Custom query to find the last season's competition ranking by competition ID.
   *
   * @param id the ID of the competition
   * @return an Optional containing a list of ClubRanking if found, or empty if not found
   */
  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(competition_id) LIKE LOWER(CONCAT('%', :id, '%')) AND season = 2023", nativeQuery = true)
  Optional<List<ClubRanking>> findLastCompetitionRankingByCompetitionIdCustomQuery(String id);

  /**
   * Custom query to find the competition rankings by competition name.
   *
   * @param name the name of the competition
   * @return an Optional containing a list of ClubRanking if found, or empty if not found
   */
  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(competition_name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
  Optional<List<ClubRanking>> findCompetitionRankingByCompetitionNameCustomQuery(String name);

}
