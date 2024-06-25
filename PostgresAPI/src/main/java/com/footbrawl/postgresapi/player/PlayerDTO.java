package com.footbrawl.postgresapi.player;

import java.time.LocalDate;

/**
 * Data Transfer Object for Player.
 */
public class PlayerDTO {
  private Long playerId;
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

  /**
   * Default constructor.
   */
  public PlayerDTO() {

  }

  /**
   * Gets the player ID.
   *
   * @return the player ID
   */
  public Long getPlayerId() {
    return playerId;
  }

  /**
   * Sets the player ID.
   *
   * @param playerId the player ID
   */
  public void setPlayerId(Long playerId) {
    this.playerId = playerId;
  }

  /**
   * Gets the first name of the player.
   *
   * @return the first name of the player
   */
  public String getFirstName() {
    return firstName;
  }

  /**
   * Sets the first name of the player.
   *
   * @param firstName the first name of the player
   */
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  /**
   * Gets the last name of the player.
   *
   * @return the last name of the player
   */
  public String getLastName() {
    return lastName;
  }

  /**
   * Sets the last name of the player.
   *
   * @param lastName the last name of the player
   */
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  /**
   * Gets the name of the player.
   *
   * @return the name of the player
   */
  public String getName() {
    return name;
  }

  /**
   * Sets the name of the player.
   *
   * @param name the name of the player
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets the age of the player.
   *
   * @return the age of the player
   */
  public Integer getAge() {
    return age;
  }

  /**
   * Sets the age of the player.
   *
   * @param age the age of the player
   */
  public void setAge(Integer age) {
    this.age = age;
  }

  /**
   * Gets the market value of the player.
   *
   * @return the market value of the player
   */
  public Integer getMarketValue() {
    return marketValue;
  }

  /**
   * Sets the market value of the player.
   *
   * @param marketValue the market value of the player
   */
  public void setMarketValue(Integer marketValue) {
    this.marketValue = marketValue;
  }

  /**
   * Gets the highest market value of the player.
   *
   * @return the highest market value of the player
   */
  public Integer getHighestMarketValue() {
    return highestMarketValue;
  }

  /**
   * Sets the highest market value of the player.
   *
   * @param highestMarketValue the highest market value of the player
   */
  public void setHighestMarketValue(Integer highestMarketValue) {
    this.highestMarketValue = highestMarketValue;
  }

  /**
   * Gets the last season the player participated in.
   *
   * @return the last season the player participated in
   */
  public Integer getLastSeason() {
    return lastSeason;
  }

  /**
   * Sets the last season the player participated in.
   *
   * @param lastSeason the last season the player participated in
   */
  public void setLastSeason(Integer lastSeason) {
    this.lastSeason = lastSeason;
  }

  /**
   * Gets the current club ID of the player.
   *
   * @return the current club ID of the player
   */
  public Integer getCurrentClubId() {
    return currentClubId;
  }

  /**
   * Sets the current club ID of the player.
   *
   * @param currentClubId the current club ID of the player
   */
  public void setCurrentClubId(Integer currentClubId) {
    this.currentClubId = currentClubId;
  }

  /**
   * Gets the country of birth of the player.
   *
   * @return the country of birth of the player
   */
  public String getCountryOfBirth() {
    return countryOfBirth;
  }

  /**
   * Sets the country of birth of the player.
   *
   * @param countryOfBirth the country of birth of the player
   */
  public void setCountryOfBirth(String countryOfBirth) {
    this.countryOfBirth = countryOfBirth;
  }

  /**
   * Gets the date of birth of the player.
   *
   * @return the date of birth of the player
   */
  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  /**
   * Sets the date of birth of the player.
   *
   * @param dateOfBirth the date of birth of the player
   */
  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  /**
   * Gets the position of the player.
   *
   * @return the position of the player
   */
  public String getPosition() {
    return position;
  }

  /**
   * Sets the position of the player.
   *
   * @param position the position of the player
   */
  public void setPosition(String position) {
    this.position = position;
  }

  /**
   * Gets the preferred foot of the player.
   *
   * @return the preferred foot of the player
   */
  public String getFoot() {
    return foot;
  }

  /**
   * Sets the preferred foot of the player.
   *
   * @param foot the preferred foot of the player
   */
  public void setFoot(String foot) {
    this.foot = foot;
  }

  /**
   * Gets the height of the player in centimeters.
   *
   * @return the height of the player in centimeters
   */
  public Integer getHeightInCm() {
    return heightInCm;
  }

  /**
   * Sets the height of the player in centimeters.
   *
   * @param heightInCm the height of the player in centimeters
   */
  public void setHeightInCm(Integer heightInCm) {
    this.heightInCm = heightInCm;
  }

  /**
   * Gets the image URL of the player.
   *
   * @return the image URL of the player
   */
  public String getImageUrl() {
    return imageUrl;
  }

  /**
   * Sets the image URL of the player.
   *
   * @param imageUrl the image URL of the player
   */
  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  /**
   * Gets the current club domestic competition ID.
   *
   * @return the current club domestic competition ID
   */
  public String getCurrentClubDomesticCompetitionId() {
    return currentClubDomesticCompetitionId;
  }

  /**
   * Sets the current club domestic competition ID.
   *
   * @param currentClubDomesticCompetitionId the current club domestic competition ID
   */
  public void setCurrentClubDomesticCompetitionId(String currentClubDomesticCompetitionId) {
    this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
  }

  /**
   * Gets the current club name of the player.
   *
   * @return the current club name of the player
   */
  public String getCurrentClubName() {
    return currentClubName;
  }

  /**
   * Sets the current club name of the player.
   *
   * @param currentClubName the current club name of the player
   */
  public void setCurrentClubName(String currentClubName) {
    this.currentClubName = currentClubName;
  }
}
