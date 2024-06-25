package com.footbrawl.postgresapi.competition;

/**
 * Data Transfer Object for Competition.
 */
public class CompetitionDTO {
  private String competitionId;
  private String name;
  private String type;
  private String countryName;
  private String domesticLeagueCode;
  private String confederation;
  private String url;

  /**
   * Default constructor.
   */
  public CompetitionDTO() {

  }

  /**
   * Gets the competition ID.
   *
   * @return the competition ID
   */
  public String getCompetitionId() {
    return competitionId;
  }

  /**
   * Sets the competition ID.
   *
   * @param competitionId the competition ID
   */
  public void setCompetitionId(String competitionId) {
    this.competitionId = competitionId;
  }

  /**
   * Gets the name of the competition.
   *
   * @return the name of the competition
   */
  public String getName() {
    return name;
  }

  /**
   * Sets the name of the competition.
   *
   * @param name the name of the competition
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets the type of the competition.
   *
   * @return the type of the competition
   */
  public String getType() {
    return type;
  }

  /**
   * Sets the type of the competition.
   *
   * @param type the type of the competition
   */
  public void setType(String type) {
    this.type = type;
  }

  /**
   * Gets the country name where the competition is held.
   *
   * @return the country name
   */
  public String getCountryName() {
    return countryName;
  }

  /**
   * Sets the country name where the competition is held.
   *
   * @param countryName the country name
   */
  public void setCountryName(String countryName) {
    this.countryName = countryName;
  }

  /**
   * Gets the domestic league code of the competition.
   *
   * @return the domestic league code
   */
  public String getDomesticLeagueCode() {
    return domesticLeagueCode;
  }

  /**
   * Sets the domestic league code of the competition.
   *
   * @param domesticLeagueCode the domestic league code
   */
  public void setDomesticLeagueCode(String domesticLeagueCode) {
    this.domesticLeagueCode = domesticLeagueCode;
  }

  /**
   * Gets the confederation of the competition.
   *
   * @return the confederation
   */
  public String getConfederation() {
    return confederation;
  }

  /**
   * Sets the confederation of the competition.
   *
   * @param confederation the confederation
   */
  public void setConfederation(String confederation) {
    this.confederation = confederation;
  }

  /**
   * Gets the URL of the competition.
   *
   * @return the URL of the competition
   */
  public String getUrl() {
    return url;
  }

  /**
   * Sets the URL of the competition.
   *
   * @param url the URL of the competition
   */
  public void setUrl(String url) {
    this.url = url;
  }
}
