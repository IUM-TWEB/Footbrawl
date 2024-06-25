package com.footbrawl.postgresapi.competition;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing a Competition.
 */
@Entity
@Table(name = "competitions")
public class Competition {
  @Id
  private String competition_id;
  private String competition_code;
  private String name;
  private String sub_type;
  private String type;
  private int country_id;
  private String country_name;
  private String domestic_league_code;
  private String confederation;
  private String url;

  /**
   * Default constructor.
   */
  public Competition() {

  }

  /**
   * Constructor with all fields.
   *
   * @param competition_id       the ID of the competition
   * @param competition_code     the code of the competition
   * @param name                 the name of the competition
   * @param sub_type             the sub-type of the competition
   * @param type                 the type of the competition
   * @param country_id           the ID of the country
   * @param country_name         the name of the country
   * @param domestic_league_code the code of the domestic league
   * @param confederation        the confederation of the competition
   * @param url                  the URL of the competition
   */
  public Competition(String competition_id, String competition_code, String name, String sub_type, String type, int country_id, String country_name, String domestic_league_code, String confederation, String url) {
    this.competition_id = competition_id;
    this.competition_code = competition_code;
    this.name = name;
    this.sub_type = sub_type;
    this.type = type;
    this.country_id = country_id;
    this.country_name = country_name;
    this.domestic_league_code = domestic_league_code;
    this.confederation = confederation;
    this.url = url;
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
   * Gets the competition code.
   *
   * @return the competition code
   */
  public String getCompetition_code() {
    return competition_code;
  }

  /**
   * Sets the competition code.
   *
   * @param competition_code the competition code
   */
  public void setCompetition_code(String competition_code) {
    this.competition_code = competition_code;
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
   * Gets the sub-type of the competition.
   *
   * @return the sub-type of the competition
   */
  public String getSub_type() {
    return sub_type;
  }

  /**
   * Sets the sub-type of the competition.
   *
   * @param sub_type the sub-type of the competition
   */
  public void setSub_type(String sub_type) {
    this.sub_type = sub_type;
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
   * Gets the country ID.
   *
   * @return the country ID
   */
  public int getCountry_id() {
    return country_id;
  }

  /**
   * Sets the country ID.
   *
   * @param country_id the country ID
   */
  public void setCountry_id(int country_id) {
    this.country_id = country_id;
  }

  /**
   * Gets the country name.
   *
   * @return the country name
   */
  public String getCountry_name() {
    return country_name;
  }

  /**
   * Sets the country name.
   *
   * @param country_name the country name
   */
  public void setCountry_name(String country_name) {
    this.country_name = country_name;
  }

  /**
   * Gets the domestic league code.
   *
   * @return the domestic league code
   */
  public String getDomestic_league_code() {
    return domestic_league_code;
  }

  /**
   * Sets the domestic league code.
   *
   * @param domestic_league_code the domestic league code
   */
  public void setDomestic_league_code(String domestic_league_code) {
    this.domestic_league_code = domestic_league_code;
  }

  /**
   * Gets the confederation of the competition.
   *
   * @return the confederation of the competition
   */
  public String getConfederation() {
    return confederation;
  }

  /**
   * Sets the confederation of the competition.
   *
   * @param confederation the confederation of the competition
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
