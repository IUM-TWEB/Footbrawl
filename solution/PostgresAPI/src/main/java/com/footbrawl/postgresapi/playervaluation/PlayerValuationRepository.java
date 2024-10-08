package com.footbrawl.postgresapi.playervaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerValuationRepository extends JpaRepository<PlayerValuation, Long> {

  @Query(value = "SELECT * FROM player_valuations WHERE player_id = :id", nativeQuery = true)
  Optional<List<PlayerValuation>> findPlayerValuationByIdCustomQuery(int id);

}
