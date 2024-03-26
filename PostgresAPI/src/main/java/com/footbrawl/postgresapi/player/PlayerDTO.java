package com.footbrawl.postgresapi.player;

import java.time.LocalDate;

public class PlayerDTO {
  private String firstName;
  private String lastName;
  private String name;
  private Integer age;
  private Integer marketValue;
  private Integer highestMarketValue;
  private Integer lastSeason;
  private Integer currentClubId;
  private String countryOfBirth;
  private LocalDate dateOfBirth;
  private String position;
  private String foot;
  private Integer heightInCm;
  private String imageUrl;
  private String currentClubDomesticCompetitionId;
  private String currentClubName;

  public PlayerDTO() {

  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public Integer getMarketValue() {
    return marketValue;
  }

  public void setMarketValue(Integer marketValue) {
    this.marketValue = marketValue;
  }

  public Integer getHighestMarketValue() {
    return highestMarketValue;
  }

  public void setHighestMarketValue(Integer highestMarketValue) {
    this.highestMarketValue = highestMarketValue;
  }

  public Integer getLastSeason() {
    return lastSeason;
  }

  public void setLastSeason(Integer lastSeason) {
    this.lastSeason = lastSeason;
  }

  public Integer getCurrentClubId() {
    return currentClubId;
  }

  public void setCurrentClubId(Integer currentClubId) {
    this.currentClubId = currentClubId;
  }

  public String getCountryOfBirth() {
    return countryOfBirth;
  }

  public void setCountryOfBirth(String countryOfBirth) {
    this.countryOfBirth = countryOfBirth;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getFoot() {
    return foot;
  }

  public void setFoot(String foot) {
    this.foot = foot;
  }

  public Integer getHeightInCm() {
    return heightInCm;
  }

  public void setHeightInCm(Integer heightInCm) {
    this.heightInCm = heightInCm;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getCurrentClubDomesticCompetitionId() {
    return currentClubDomesticCompetitionId;
  }

  public void setCurrentClubDomesticCompetitionId(String currentClubDomesticCompetitionId) {
    this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
  }

  public String getCurrentClubName() {
    return currentClubName;
  }

  public void setCurrentClubName(String currentClubName) {
    this.currentClubName = currentClubName;
  }
}
