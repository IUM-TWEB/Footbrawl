package com.footbrawl.postgresapi.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

  @Query(value = "SELECT * FROM competitions WHERE competition_id = :id", nativeQuery = true)
  Optional<Competition> findCompetitionByIdCustomQuery(String id);

}
