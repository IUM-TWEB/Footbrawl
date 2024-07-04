package com.footbrawl.postgresapi.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Competition entities.
 */
@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

  /**
   * Custom query to find a competition by its ID.
   *
   * @param id the ID of the competition
   * @return an Optional containing the Competition if found, or empty if not found
   */
  @Query(value = "SELECT * FROM competitions WHERE competition_id = :id", nativeQuery = true)
  Optional<Competition> findCompetitionByIdCustomQuery(String id);

  /**
   * Custom query to find competitions by their name.
   *
   * @param name the name of the competitions
   * @return an Optional containing a list of Competitions if found, or empty if not found
   */
  @Query(value = "SELECT * FROM competitions WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Competition>> findCompetitionByNameCustomQuery(String name);

  /*-------------Query necessarie per il processo di business----------------*/

  /**
   * Custom query to find the name of a competition by its ID.
   *
   * @param id the ID of the competition
   * @return an Optional containing the name of the competition if found, or empty if not found
   */
  @Query(value = "SELECT p.name FROM Competition p WHERE p.competition_id = :id")
  Optional<String> findCompetitionNameById(String id);

  /*--------------------------------------------------------------------------*/

}
