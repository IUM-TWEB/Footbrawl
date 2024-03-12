package com.footbrawl.postgresapi.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

  Optional<Player> findByName(String first_name);

  @Query(value = "SELECT * FROM players WHERE player_id = :id", nativeQuery = true)
  Optional<Player> findPlayerByIdCustomQuery(int id);

  @Query(value = "SELECT * FROM players WHERE current_club_id = :id", nativeQuery = true)
  Optional<List<Player>> findPlayersByCurrent_club_id(int id);

}