package com.footbrawl.postgresapi.playervaluation;

import java.sql.Date;

public class PlayerValuationDTO {
  private String playerName;
  private Integer lastSeason;
  private Date date;
  private Date dateWeek;
  private Integer n;
  private String currentClubName;
  private String playerClubDomesticCompetitionName;
  private Integer marketValue;

  public PlayerValuationDTO(){

  }

  public String getPlayerName() {
    return playerName;
  }

  public void setPlayerName(String playerName) {
    this.playerName = playerName;
  }

  public Integer getLastSeason() {
    return lastSeason;
  }

  public void setLastSeason(Integer lastSeason) {
    this.lastSeason = lastSeason;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public Date getDateWeek() {
    return dateWeek;
  }

  public void setDateWeek(Date dateWeek) {
    this.dateWeek = dateWeek;
  }

  public Integer getN() {
    return n;
  }

  public void setN(Integer n) {
    this.n = n;
  }

  public String getCurrentClubName() {
    return currentClubName;
  }

  public void setCurrentClubName(String currentClubName) {
    this.currentClubName = currentClubName;
  }

  public String getPlayerClubDomesticCompetitionName() {
    return playerClubDomesticCompetitionName;
  }

  public void setPlayerClubDomesticCompetitionName(String playerClubDomesticCompetitionName) {
    this.playerClubDomesticCompetitionName = playerClubDomesticCompetitionName;
  }

  public Integer getMarketValue() {
    return marketValue;
  }

  public void setMarketValue(Integer marketValue) {
    this.marketValue = marketValue;
  }
}
