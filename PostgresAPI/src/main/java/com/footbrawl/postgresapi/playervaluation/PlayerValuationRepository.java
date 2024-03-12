package com.footbrawl.postgresapi.playervaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerValuationRepository extends JpaRepository<PlayerValuation, Long> {
}
