package com.footbrawl.postgresapi.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Player entities.
 */
@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

  /**
   * Custom query to find a player by their ID.
   *
   * @param id the ID of the player
   * @return an Optional containing the Player if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE player_id = :id", nativeQuery = true)
  Optional<Player> findPlayerByIdCustomQuery(int id);

  /**
   * Custom query to find players by their current club ID.
   *
   * @param id the ID of the club
   * @return an Optional containing a list of Players if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE current_club_id = :id", nativeQuery = true)
  Optional<List<Player>> findPlayersByCurrent_club_id(int id);

  /**
   * Custom query to find players by their current club ID for the last season.
   *
   * @param id the ID of the club
   * @return an Optional containing a list of Players if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE current_club_id = :id AND last_season = 2023", nativeQuery = true)
  Optional<List<Player>> findLastSeasonPlayersByCurrent_club_id(int id);

  /**
   * Custom query to find players by their name.
   *
   * @param name the name of the players
   * @return an Optional containing a list of Players if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Player>> findPlayerByNameCustomQuery(@Param("name") String name);

  /**
   * Custom query to find players by their first and last name.
   *
   * @param firstName the first name of the players
   * @param lastName  the last name of the players
   * @return an Optional containing a list of Players if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE (LOWER(first_name) LIKE LOWER(CONCAT('%', :firstName, '%')) AND LOWER(last_name) LIKE LOWER(CONCAT('%', :lastName, '%'))) OR (LOWER(first_name) LIKE LOWER(CONCAT('%', :lastName, '%')) AND LOWER(last_name) LIKE LOWER(CONCAT('%', :firstName, '%')))", nativeQuery = true)
  Optional<List<Player>> findPlayerByName2CustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName);

  /*-------------Query necessarie per il processo di business----------------*/

  /**
   * Custom query to find players by their current club ID and last season.
   *
   * @param id         the ID of the club
   * @param lastSeason the last season year
   * @return an Optional containing a list of Players if found, or empty if not found
   */
  @Query(value = "SELECT * FROM players WHERE current_club_id = :id AND last_season = :lastSeason", nativeQuery = true)
  Optional<List<Player>> findClubPlayersMVByCurrent_club_id(long id, int lastSeason);

  /**
   * Custom query to find the name of a player by their ID.
   *
   * @param id the ID of the player
   * @return an Optional containing the name of the player if found, or empty if not found
   */
  @Query("SELECT p.name FROM Player p WHERE p.player_id = :id")
  Optional<String> findPlayerNameById(int id);

  /**
   * Custom query to find the ID of a player by their name.
   *
   * @param name the name of the player
   * @return an Optional containing the ID of the player if found, or empty if not found
   */
  @Query("SELECT p.player_id FROM Player p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
  Optional<Integer> findPlayerIdByName(String name);

  /*--------------------------------------------------------------------------*/

  /**
   * Custom query to find both players and clubs by name.
   *
   * @param firstName the first name of the player
   * @param lastName  the last name of the player
   * @param name      the name of the club
   * @return an Optional containing a list of Objects representing players and clubs if found, or empty if not found
   */
  @Query(value = "SELECT 'player' as type, id, first_name, last_name FROM players WHERE first_name LIKE %:firstName% AND last_name LIKE %:lastName% " +
      "UNION " +
      "SELECT 'club' as type, id, name, '' as last_name FROM clubs WHERE name LIKE %:name% " +
      "ORDER BY first_name, last_name, name", nativeQuery = true)
  Optional<List<Object>> findPlayerAndClubByNameCustomQuery(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("name") String name);

  /**
   * Custom query to find top market players by their competition ID.
   *
   * @param competitionId the ID of the competition
   * @return a list of Players if found
   */
  @Query("SELECT p FROM Player p WHERE p.market_value_in_eur IS NOT NULL AND p.current_club_domestic_competition_id = :competitionId ORDER BY p.market_value_in_eur DESC")
  List<Player> findTopMarketPlayersByCompetitionId(@Param("competitionId") String competitionId);
}
