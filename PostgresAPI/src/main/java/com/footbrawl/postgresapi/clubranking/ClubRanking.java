package com.footbrawl.postgresapi.clubranking;

import jakarta.persistence.*;

import java.util.UUID;

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

  public ClubRanking() {

  }

  public ClubRanking(int id, int club_id, int position, int season, String competition_id, String club_name, String competition_name) {
    this.ranking_id = id;
    this.club_id = club_id;
    this.position = position;
    this.season = season;
    this.competition_id = competition_id;
    this.club_name = club_name;
    this.competition_name = competition_name;
  }

  public int getRanking_id() {
    return ranking_id;
  }

  public void setRanking_id(int id) {
    this.ranking_id = id;
  }

  public String getCompetition_id() {
    return competition_id;
  }

  public void setCompetition_id(String competition_id) {
    this.competition_id = competition_id;
  }

  public int getSeason() {
    return season;
  }

  public void setSeason(int season) {
    this.season = season;
  }

  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }

  public int getClub_id() {
    return club_id;
  }

  public void setClub_id(int club_id) {
    this.club_id = club_id;
  }

  public String getClub_name() {
    return club_name;
  }

  public void setClub_name(String club_name) {
    this.club_name = club_name;
  }

  public String getCompetition_name() {
    return competition_name;
  }

  public void setCompetition_name(String competition_name) {
    this.competition_name = competition_name;
  }
}
