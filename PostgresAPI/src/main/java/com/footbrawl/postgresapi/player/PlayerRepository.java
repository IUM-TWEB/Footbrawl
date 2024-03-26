package com.footbrawl.postgresapi.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

  @Query(value = "SELECT * FROM players WHERE current_club_id = :id AND last_season = :lastSeason", nativeQuery = true)
  Optional<List<Player>> findClubPlayersMVByCurrent_club_id(long id, int lastSeason);

  @Query(value = "SELECT * FROM players WHERE first_name LIKE %:firstName% AND last_name LIKE %:lastName%", nativeQuery = true)
  Optional<List<Player>> findPlayerByNameCustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName);

  @Query(value = "SELECT 'player' as type, id, first_name, last_name FROM players WHERE first_name LIKE %:firstName% AND last_name LIKE %:lastName% " +
      "UNION " +
      "SELECT 'club' as type, id, name, '' as last_name FROM clubs WHERE name LIKE %:name% " +
      "ORDER BY first_name, last_name, name", nativeQuery = true)
  Optional<List<Object>> findPlayerAndClubByNameCustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("name") String name);

}