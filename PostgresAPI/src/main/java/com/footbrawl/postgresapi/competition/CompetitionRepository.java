package com.footbrawl.postgresapi.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

  @Query(value = "SELECT * FROM competitions WHERE competition_id = :id", nativeQuery = true)
  Optional<Competition> findCompetitionByIdCustomQuery(String id);

  @Query(value = "SELECT * FROM competitions WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Competition>> findCompetitionByNameCustomQuery(String name);

  /*-------------Query necessarie per il processo di business----------------*/

  @Query(value = "SELECT p.name FROM Competition p WHERE p.competition_id = :id")
  Optional<String> findCompetitionNameById(String id);

  /*--------------------------------------------------------------------------*/

}
