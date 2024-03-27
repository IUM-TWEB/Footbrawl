package com.footbrawl.postgresapi.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

  @Query(value = "SELECT * FROM clubs WHERE club_id = :id", nativeQuery = true)
  Optional<Club> findClubByIdCustomQuery(int id);

  @Query(value = "SELECT * FROM clubs WHERE LOWER(name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
  Optional<List<Club>> findClubByNameCustomQuery(String name);

}
