package com.footbrawl.postgresapi.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Club entities.
 */
@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

  /**
   * Custom query to find a club by its ID.
   *
   * @param id the ID of the club
   * @return an Optional containing the Club if found, or empty if not found
   */
  @Query(value = "SELECT * FROM clubs WHERE club_id = :id", nativeQuery = true)
  Optional<Club> findClubByIdCustomQuery(int id);

  /**
   * Custom query to find clubs by their name.
   *
   * @param name the name of the clubs
   * @return an Optional containing a list of Clubs if found, or empty if not found
   */
  @Query(value = "SELECT * FROM clubs WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Club>> findClubByNameCustomQuery(String name);

  /*-------------Query necessarie per il processo di business----------------*/

  /**
   * Custom query to find the name of a club by its ID.
   *
   * @param id the ID of the club
   * @return an Optional containing the name of the club if found, or empty if not found
   */
  @Query(value = "SELECT p.name FROM Club p WHERE p.club_id = :id")
  Optional<String> findClubNameById(int id);

  /*--------------------------------------------------------------------------*/

}
