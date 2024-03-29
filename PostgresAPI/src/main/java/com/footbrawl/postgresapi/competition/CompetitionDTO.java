package com.footbrawl.postgresapi.competition;

public class CompetitionDTO {
  private String competitionId;
  private String name;
  private String type;
  private String countryName;
  private String domesticLeagueCode;
  private String confederation;
  private String url;

  public CompetitionDTO(){

  }

  public String getCompetitionId() {
    return competitionId;
  }

  public void setCompetitionId(String competitionId) {
    this.competitionId = competitionId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getCountryName() {
    return countryName;
  }

  public void setCountryName(String countryName) {
    this.countryName = countryName;
  }

  public String getDomesticLeagueCode() {
    return domesticLeagueCode;
  }

  public void setDomesticLeagueCode(String domesticLeagueCode) {
    this.domesticLeagueCode = domesticLeagueCode;
  }

  public String getConfederation() {
    return confederation;
  }

  public void setConfederation(String confederation) {
    this.confederation = confederation;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
