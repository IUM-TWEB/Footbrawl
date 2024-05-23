package com.footbrawl.postgresapi.clubranking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRankingRepository extends JpaRepository<ClubRanking, Long> {

  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(club_name) LIKE LOWER(CONCAT('%', :name, '%')) AND season = 2023", nativeQuery = true)
  Optional<List<ClubRanking>> findLastClubRankingByClubNameCustomQuery(String name);

  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(club_name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
  Optional<List<ClubRanking>> findClubRankingByClubNameCustomQuery(String name);

  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(competition_name) LIKE LOWER(CONCAT('%', :name, '%')) AND season = 2023", nativeQuery = true)
  Optional<List<ClubRanking>> findLastCompetitionRankingByCompetitionNameCustomQuery(String name);

  @Query(value = "SELECT * FROM club_ranking WHERE LOWER(competition_name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
  Optional<List<ClubRanking>> findCompetitionRankingByCompetitionNameCustomQuery(String name);

}
