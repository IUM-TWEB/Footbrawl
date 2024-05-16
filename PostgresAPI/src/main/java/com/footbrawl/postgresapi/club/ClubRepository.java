package com.footbrawl.postgresapi.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
  @Query("SELECT c.club_id FROM Club c")
  List<Long> findAllClubIds();

  @Query(value = "SELECT * FROM clubs WHERE club_id = :id", nativeQuery = true)
  Optional<Club> findClubByIdCustomQuery(int id);

  @Query(value = "SELECT * FROM clubs WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')) LIMIT 10", nativeQuery = true)
  Optional<List<Club>> findClubByNameCustomQuery(String name);

  /*-------------Query necessarie per il processo di business----------------*/

  @Query(value = "SELECT p.name FROM Club p WHERE p.club_id = :id")
  Optional<String> findClubNameById(int id);

  /*--------------------------------------------------------------------------*/

}
