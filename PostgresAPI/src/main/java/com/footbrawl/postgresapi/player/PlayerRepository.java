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

  @Query(value = "SELECT * FROM players WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Player>> findPlayerByNameCustomQuery(@Param("name") String name);

  //@Query(value = "SELECT * FROM players WHERE first_name LIKE %:firstName% AND last_name LIKE %:lastName%", nativeQuery = true)
  @Query(value = "SELECT * FROM players WHERE (LOWER(first_name) LIKE LOWER(CONCAT('%', :firstName, '%')) AND LOWER(last_name) LIKE LOWER(CONCAT('%', :lastName, '%'))) OR (LOWER(first_name) LIKE LOWER(CONCAT('%', :lastName, '%')) AND LOWER(last_name) LIKE LOWER(CONCAT('%', :firstName, '%')))", nativeQuery = true)
  Optional<List<Player>> findPlayerByName2CustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName);

  /*-------------Query necessarie per il processo di business----------------*/

  @Query(value = "SELECT * FROM players WHERE current_club_id = :id AND last_season = :lastSeason", nativeQuery = true)
  Optional<List<Player>> findClubPlayersMVByCurrent_club_id(long id, int lastSeason);

  @Query("SELECT p.name FROM Player p WHERE p.player_id = :id")
  Optional<String> findPlayerNameById(int id);

  @Query("SELECT p.player_id FROM Player p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
  Optional<Integer> findPlayerIdByName(String name);

  /*--------------------------------------------------------------------------*/

  @Query(value = "SELECT 'player' as type, id, first_name, last_name FROM players WHERE first_name LIKE %:firstName% AND last_name LIKE %:lastName% " +
      "UNION " +
      "SELECT 'club' as type, id, name, '' as last_name FROM clubs WHERE name LIKE %:name% " +
      "ORDER BY first_name, last_name, name", nativeQuery = true)
  Optional<List<Object>> findPlayerAndClubByNameCustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("name") String name);

}