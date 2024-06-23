package com.footbrawl.postgresapi.club;

public class ClubDTO {
  private Long clubId;
  private String clubCode;
  private String name;
  private String domesticCompetitionId;
  private String domesticCompetitionName;
  private Integer squadSize;
  private Float averageAge;
  private Integer foreignersNumber;
  private Float foreignersPercentage;
  private Integer nationalTeamPlayers;
  private String stadiumName;
  private int stadiumSeats;
  private String coachName;
  private Integer last_season;
  private String url;
  private Integer netTransferRec;
  private Integer totalMarketVal;

  public ClubDTO() {

  }

  public Long getClubId() {
    return clubId;
  }

  public void setClubId(Long clubId) {
    this.clubId = clubId;
  }

  public String getClubCode() {
    return clubCode;
  }

  public void setClubCode(String clubCode) {
    this.clubCode = clubCode;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDomesticCompetitionId() {
    return domesticCompetitionId;
  }

  public void setDomesticCompetitionId(String domesticCompetitionId) {
    this.domesticCompetitionId = domesticCompetitionId;
  }

  public String getDomesticCompetitionName() {
    return domesticCompetitionName;
  }

  public void setDomesticCompetitionName(String domesticCompetitionName) {
    this.domesticCompetitionName = domesticCompetitionName;
  }

  public int getSquadSize() {
    return squadSize;
  }

  public void setSquadSize(int squadSize) {
    this.squadSize = squadSize;
  }

  public Float getAverageAge() {
    return averageAge;
  }

  public void setAverageAge(Float averageAge) {
    this.averageAge = averageAge;
  }

  public int getForeignersNumber() {
    return foreignersNumber;
  }

  public void setForeignersNumber(int foreignersNumber) {
    this.foreignersNumber = foreignersNumber;
  }

  public Float getForeignersPercentage() {
    return foreignersPercentage;
  }

  public void setForeignersPercentage(Float foreignersPercentage) {
    this.foreignersPercentage = foreignersPercentage;
  }

  public int getNationalTeamPlayers() {
    return nationalTeamPlayers;
  }

  public void setNationalTeamPlayers(int nationalTeamPlayers) {
    this.nationalTeamPlayers = nationalTeamPlayers;
  }

  public String getStadiumName() {
    return stadiumName;
  }

  public void setStadiumName(String stadiumName) {
    this.stadiumName = stadiumName;
  }

  public int getStadiumSeats() {
    return stadiumSeats;
  }

  public void setStadiumSeats(int stadiumSeats) {
    this.stadiumSeats = stadiumSeats;
  }

  public String getCoachName() {
    return coachName;
  }

  public void setCoachName(String coachName) {
    this.coachName = coachName;
  }

  public int getLast_season() {
    return last_season;
  }

  public void setLast_season(int last_season) {
    this.last_season = last_season;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public int getNetTransferRec() {
    return netTransferRec;
  }

  public void setNetTransferRec(int netTransferRec) {
    this.netTransferRec = netTransferRec;
  }

  public int getTotalMarketVal() {
    return totalMarketVal;
  }

  public void setTotalMarketVal(int totalMarketVal) {
    this.totalMarketVal = totalMarketVal;
  }
}
