package com.footbrawl.postgresapi.club;

/**
 * Data Transfer Object for Club.
 */
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

  /**
   * Default constructor.
   */
  public ClubDTO() {

  }

  /**
   * Gets the club ID.
   *
   * @return the club ID
   */
  public Long getClubId() {
    return clubId;
  }

  /**
   * Sets the club ID.
   *
   * @param clubId the club ID
   */
  public void setClubId(Long clubId) {
    this.clubId = clubId;
  }

  /**
   * Gets the club code.
   *
   * @return the club code
   */
  public String getClubCode() {
    return clubCode;
  }

  /**
   * Sets the club code.
   *
   * @param clubCode the club code
   */
  public void setClubCode(String clubCode) {
    this.clubCode = clubCode;
  }

  /**
   * Gets the name of the club.
   *
   * @return the name of the club
   */
  public String getName() {
    return name;
  }

  /**
   * Sets the name of the club.
   *
   * @param name the name of the club
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets the domestic competition ID.
   *
   * @return the domestic competition ID
   */
  public String getDomesticCompetitionId() {
    return domesticCompetitionId;
  }

  /**
   * Sets the domestic competition ID.
   *
   * @param domesticCompetitionId the domestic competition ID
   */
  public void setDomesticCompetitionId(String domesticCompetitionId) {
    this.domesticCompetitionId = domesticCompetitionId;
  }

  /**
   * Gets the domestic competition name.
   *
   * @return the domestic competition name
   */
  public String getDomesticCompetitionName() {
    return domesticCompetitionName;
  }

  /**
   * Sets the domestic competition name.
   *
   * @param domesticCompetitionName the domestic competition name
   */
  public void setDomesticCompetitionName(String domesticCompetitionName) {
    this.domesticCompetitionName = domesticCompetitionName;
  }

  /**
   * Gets the squad size.
   *
   * @return the squad size
   */
  public int getSquadSize() {
    return squadSize;
  }

  /**
   * Sets the squad size.
   *
   * @param squadSize the squad size
   */
  public void setSquadSize(int squadSize) {
    this.squadSize = squadSize;
  }

  /**
   * Gets the average age of the squad.
   *
   * @return the average age of the squad
   */
  public Float getAverageAge() {
    return averageAge;
  }

  /**
   * Sets the average age of the squad.
   *
   * @param averageAge the average age of the squad
   */
  public void setAverageAge(Float averageAge) {
    this.averageAge = averageAge;
  }

  /**
   * Gets the number of foreign players.
   *
   * @return the number of foreign players
   */
  public int getForeignersNumber() {
    return foreignersNumber;
  }

  /**
   * Sets the number of foreign players.
   *
   * @param foreignersNumber the number of foreign players
   */
  public void setForeignersNumber(int foreignersNumber) {
    this.foreignersNumber = foreignersNumber;
  }

  /**
   * Gets the percentage of foreign players.
   *
   * @return the percentage of foreign players
   */
  public Float getForeignersPercentage() {
    return foreignersPercentage;
  }

  /**
   * Sets the percentage of foreign players.
   *
   * @param foreignersPercentage the percentage of foreign players
   */
  public void setForeignersPercentage(Float foreignersPercentage) {
    this.foreignersPercentage = foreignersPercentage;
  }

  /**
   * Gets the number of national team players.
   *
   * @return the number of national team players
   */
  public int getNationalTeamPlayers() {
    return nationalTeamPlayers;
  }

  /**
   * Sets the number of national team players.
   *
   * @param nationalTeamPlayers the number of national team players
   */
  public void setNationalTeamPlayers(int nationalTeamPlayers) {
    this.nationalTeamPlayers = nationalTeamPlayers;
  }

  /**
   * Gets the stadium name.
   *
   * @return the stadium name
   */
  public String getStadiumName() {
    return stadiumName;
  }

  /**
   * Sets the stadium name.
   *
   * @param stadiumName the stadium name
   */
  public void setStadiumName(String stadiumName) {
    this.stadiumName = stadiumName;
  }

  /**
   * Gets the number of stadium seats.
   *
   * @return the number of stadium seats
   */
  public int getStadiumSeats() {
    return stadiumSeats;
  }

  /**
   * Sets the number of stadium seats.
   *
   * @param stadiumSeats the number of stadium seats
   */
  public void setStadiumSeats(int stadiumSeats) {
    this.stadiumSeats = stadiumSeats;
  }

  /**
   * Gets the coach name.
   *
   * @return the coach name
   */
  public String getCoachName() {
    return coachName;
  }

  /**
   * Sets the coach name.
   *
   * @param coachName the coach name
   */
  public void setCoachName(String coachName) {
    this.coachName = coachName;
  }

  /**
   * Gets the last season.
   *
   * @return the last season
   */
  public int getLast_season() {
    return last_season;
  }

  /**
   * Sets the last season.
   *
   * @param last_season the last season
   */
  public void setLast_season(int last_season) {
    this.last_season = last_season;
  }

  /**
   * Gets the URL.
   *
   * @return the URL
   */
  public String getUrl() {
    return url;
  }

  /**
   * Sets the URL.
   *
   * @param url the URL
   */
  public void setUrl(String url) {
    this.url = url;
  }

  /**
   * Gets the net transfer record.
   *
   * @return the net transfer record
   */
  public int getNetTransferRec() {
    return netTransferRec;
  }

  /**
   * Sets the net transfer record.
   *
   * @param netTransferRec the net transfer record
   */
  public void setNetTransferRec(int netTransferRec) {
    this.netTransferRec = netTransferRec;
  }

  /**
   * Gets the total market value.
   *
   * @return the total market value
   */
  public int getTotalMarketVal() {
    return totalMarketVal;
  }

  /**
   * Sets the total market value.
   *
   * @param totalMarketVal the total market value
   */
  public void setTotalMarketVal(int totalMarketVal) {
    this.totalMarketVal = totalMarketVal;
  }
}
