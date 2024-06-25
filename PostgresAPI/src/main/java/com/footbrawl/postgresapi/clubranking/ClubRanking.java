package com.footbrawl.postgresapi.clubranking;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing a Club Ranking.
 */
@Entity
@Table(name = "club_ranking")
public class ClubRanking {
  @Id
  private int ranking_id;
  private int club_id;
  private int position;
  private int season;
  private String competition_id;
  private String club_name;
  private String competition_name;

  /**
   * Default constructor.
   */
  public ClubRanking() {

  }

  /**
   * Constructor with all fields.
   *
   * @param ranking_id       the ranking ID
   * @param club_id          the club ID
   * @param position         the position in the ranking
   * @param season           the season year
   * @param competition_id   the competition ID
   * @param club_name        the name of the club
   * @param competition_name the name of the competition
   */
  public ClubRanking(int ranking_id, int club_id, int position, int season, String competition_id, String club_name, String competition_name) {
    this.ranking_id = ranking_id;
    this.club_id = club_id;
    this.position = position;
    this.season = season;
    this.competition_id = competition_id;
    this.club_name = club_name;
    this.competition_name = competition_name;
  }

  /**
   * Gets the ranking ID.
   *
   * @return the ranking ID
   */
  public int getRanking_id() {
    return ranking_id;
  }

  /**
   * Sets the ranking ID.
   *
   * @param ranking_id the ranking ID
   */
  public void setRanking_id(int ranking_id) {
    this.ranking_id = ranking_id;
  }

  /**
   * Gets the competition ID.
   *
   * @return the competition ID
   */
  public String getCompetition_id() {
    return competition_id;
  }

  /**
   * Sets the competition ID.
   *
   * @param competition_id the competition ID
   */
  public void setCompetition_id(String competition_id) {
    this.competition_id = competition_id;
  }

  /**
   * Gets the season year.
   *
   * @return the season year
   */
  public int getSeason() {
    return season;
  }

  /**
   * Sets the season year.
   *
   * @param season the season year
   */
  public void setSeason(int season) {
    this.season = season;
  }

  /**
   * Gets the position in the ranking.
   *
   * @return the position in the ranking
   */
  public int getPosition() {
    return position;
  }

  /**
   * Sets the position in the ranking.
   *
   * @param position the position in the ranking
   */
  public void setPosition(int position) {
    this.position = position;
  }

  /**
   * Gets the club ID.
   *
   * @return the club ID
   */
  public int getClub_id() {
    return club_id;
  }

  /**
   * Sets the club ID.
   *
   * @param club_id the club ID
   */
  public void setClub_id(int club_id) {
    this.club_id = club_id;
  }

  /**
   * Gets the name of the club.
   *
   * @return the name of the club
   */
  public String getClub_name() {
    return club_name;
  }

  /**
   * Sets the name of the club.
   *
   * @param club_name the name of the club
   */
  public void setClub_name(String club_name) {
    this.club_name = club_name;
  }

  /**
   * Gets the name of the competition.
   *
   * @return the name of the competition
   */
  public String getCompetition_name() {
    return competition_name;
  }

  /**
   * Sets the name of the competition.
   *
   * @param competition_name the name of the competition
   */
  public void setCompetition_name(String competition_name) {
    this.competition_name = competition_name;
  }
}
