package com.footbrawl.postgresapi.player;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.time.LocalDate;

/**
 * Entity class representing a Player.
 */
@Entity
@Table(name = "players")
public class Player {

  @Id
  private Long player_id;
  private String first_name;
  private String last_name;
  private String name;
  private Integer last_season;
  private Integer current_club_id;
  private String player_code;
  private String country_of_birth;
  private String city_of_birth;
  private String country_of_citizenship;
  private LocalDate date_of_birth;
  private String sub_position;
  private String position;
  //@Column(name = "foot", nullable = false, columnDefinition = "varchar")
  private String foot;
  private Integer height_in_cm;
  private String market_value_in_eur;
  private String highest_market_value_in_eur;
  private LocalDate contract_expiration_date;
  private String agent_name;
  private String image_url;
  private String url;
  private String current_club_domestic_competition_id;
  private String current_club_name;
  @Transient
  private int age;
  @Transient
  private int market_value;
  @Transient
  private int highest_market_value;

  /**
   * Default constructor.
   */
  public Player() {

  }

  /**
   * Constructor with all fields.
   *
   * @param player_id                            the ID of the player
   * @param first_name                           the first name of the player
   * @param last_name                            the last name of the player
   * @param name                                 the full name of the player
   * @param last_season                          the last season the player participated in
   * @param current_club_id                      the current club ID of the player
   * @param player_code                          the player code
   * @param country_of_birth                     the country of birth of the player
   * @param city_of_birth                        the city of birth of the player
   * @param country_of_citizenship               the country of citizenship of the player
   * @param date_of_birth                        the date of birth of the player
   * @param sub_position                         the sub position of the player
   * @param position                             the position of the player
   * @param foot                                 the preferred foot of the player
   * @param height_in_cm                         the height of the player in centimeters
   * @param market_value_in_eur                  the market value of the player in euros
   * @param highest_market_value_in_eur          the highest market value of the player in euros
   * @param contract_expiration_date             the contract expiration date of the player
   * @param agent_name                           the agent name of the player
   * @param image_url                            the image URL of the player
   * @param url                                  the URL of the player
   * @param current_club_domestic_competition_id the current club domestic competition ID
   * @param current_club_name                    the current club name of the player
   */
  public Player(Long player_id, String first_name, String last_name, String name, Integer last_season, Integer current_club_id, String player_code, String country_of_birth, String city_of_birth, String country_of_citizenship, LocalDate date_of_birth, String sub_position, String position, String foot, Integer height_in_cm, String market_value_in_eur, String highest_market_value_in_eur, LocalDate contract_expiration_date, String agent_name, String image_url, String url, String current_club_domestic_competition_id, String current_club_name) {
    this.player_id = player_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.name = name;
    this.last_season = last_season;
    this.current_club_id = current_club_id;
    this.player_code = player_code;
    this.country_of_birth = country_of_birth;
    this.city_of_birth = city_of_birth;
    this.country_of_citizenship = country_of_citizenship;
    this.date_of_birth = date_of_birth;
    this.sub_position = sub_position;
    this.position = position;
    this.foot = foot;
    this.height_in_cm = height_in_cm;
    this.market_value_in_eur = market_value_in_eur;
    this.highest_market_value_in_eur = highest_market_value_in_eur;
    this.contract_expiration_date = contract_expiration_date;
    this.agent_name = agent_name;
    this.image_url = image_url;
    this.url = url;
    this.current_club_domestic_competition_id = current_club_domestic_competition_id;
    this.current_club_name = current_club_name;
    this.age = getAge();
    this.market_value = getMarket_value();
    this.highest_market_value = getHighest_market_value();
  }

  /**
   * Gets the player ID.
   *
   * @return the player ID
   */
  public Long getPlayer_id() {
    return player_id;
  }

  /**
   * Sets the player ID.
   *
   * @param player_id the player ID
   */
  public void setPlayer_id(Long player_id) {
    this.player_id = player_id;
  }

  /**
   * Gets the first name of the player.
   *
   * @return the first name of the player
   */
  public String getFirst_name() {
    return first_name;
  }

  /**
   * Sets the first name of the player.
   *
   * @param first_name the first name of the player
   */
  public void setFirst_name(String first_name) {
    this.first_name = first_name;
  }

  /**
   * Gets the last name of the player.
   *
   * @return the last name of the player
   */
  public String getLast_name() {
    return last_name;
  }

  /**
   * Sets the last name of the player.
   *
   * @param last_name the last name of the player
   */
  public void setLast_name(String last_name) {
    this.last_name = last_name;
  }

  /**
   * Gets the full name of the player.
   *
   * @return the full name of the player
   */
  public String getName() {
    return name;
  }

  /**
   * Sets the full name of the player.
   *
   * @param name the full name of the player
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets the last season the player participated in.
   *
   * @return the last season the player participated in
   */
  public Integer getLast_season() {
    return last_season;
  }

  /**
   * Sets the last season the player participated in.
   *
   * @param last_season the last season the player participated in
   */
  public void setLast_season(Integer last_season) {
    this.last_season = last_season;
  }

  /**
   * Gets the current club ID of the player.
   *
   * @return the current club ID of the player
   */
  public Integer getCurrent_club_id() {
    return current_club_id;
  }

  /**
   * Sets the current club ID of the player.
   *
   * @param current_club_id the current club ID of the player
   */
  public void setCurrent_club_id(Integer current_club_id) {
    this.current_club_id = current_club_id;
  }

  /**
   * Gets the player code.
   *
   * @return the player code
   */
  public String getPlayer_code() {
    return player_code;
  }

  /**
   * Sets the player code.
   *
   * @param player_code the player code
   */
  public void setPlayer_code(String player_code) {
    this.player_code = player_code;
  }

  /**
   * Gets the country of birth of the player.
   *
   * @return the country of birth of the player
   */
  public String getCountry_of_birth() {
    return country_of_birth;
  }

  /**
   * Sets the country of birth of the player.
   *
   * @param country_of_birth the country of birth of the player
   */
  public void setCountry_of_birth(String country_of_birth) {
    this.country_of_birth = country_of_birth;
  }

  /**
   * Gets the city of birth of the player.
   *
   * @return the city of birth of the player
   */
  public String getCity_of_birth() {
    return city_of_birth;
  }

  /**
   * Sets the city of birth of the player.
   *
   * @param city_of_birth the city of birth of the player
   */
  public void setCity_of_birth(String city_of_birth) {
    this.city_of_birth = city_of_birth;
  }

  /**
   * Gets the country of citizenship of the player.
   *
   * @return the country of citizenship of the player
   */
  public String getCountry_of_citizenship() {
    return country_of_citizenship;
  }

  /**
   * Sets the country of citizenship of the player.
   *
   * @param country_of_citizenship the country of citizenship of the player
   */
  public void setCountry_of_citizenship(String country_of_citizenship) {
    this.country_of_citizenship = country_of_citizenship;
  }

  /**
   * Gets the date of birth of the player.
   *
   * @return the date of birth of the player
   */
  public LocalDate getDate_of_birth() {
    return date_of_birth;
  }

  /**
   * Sets the date of birth of the player.
   *
   * @param date_of_birth the date of birth of the player
   */
  public void setDate_of_birth(LocalDate date_of_birth) {
    this.date_of_birth = date_of_birth;
  }

  /**
   * Gets the sub position of the player.
   *
   * @return the sub position of the player
   */
  public String getSub_position() {
    return sub_position;
  }

  /**
   * Sets the sub position of the player.
   *
   * @param sub_position the sub position of the player
   */
  public void setSub_position(String sub_position) {
    this.sub_position = sub_position;
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
  public Integer getHeight_in_cm() {
    return height_in_cm;
  }

  /**
   * Sets the height of the player in centimeters.
   *
   * @param height_in_cm the height of the player in centimeters
   */
  public void setHeight_in_cm(Integer height_in_cm) {
    this.height_in_cm = height_in_cm;
  }

  /**
   * Gets the market value of the player in euros.
   *
   * @return the market value of the player in euros
   */
  public String getMarket_value_in_eur() {
    return market_value_in_eur;
  }

  /**
   * Sets the market value of the player in euros.
   *
   * @param market_value_in_eur the market value of the player in euros
   */
  public void setMarket_value_in_eur(String market_value_in_eur) {
    this.market_value_in_eur = market_value_in_eur;
  }

  /**
   * Gets the highest market value of the player in euros.
   *
   * @return the highest market value of the player in euros
   */
  public String getHighest_market_value_in_eur() {
    return highest_market_value_in_eur;
  }

  /**
   * Sets the highest market value of the player in euros.
   *
   * @param highest_market_value_in_eur the highest market value of the player in euros
   */
  public void setHighest_market_value_in_eur(String highest_market_value_in_eur) {
    this.highest_market_value_in_eur = highest_market_value_in_eur;
  }

  /**
   * Gets the contract expiration date of the player.
   *
   * @return the contract expiration date of the player
   */
  public LocalDate getContract_expiration_date() {
    return contract_expiration_date;
  }

  /**
   * Sets the contract expiration date of the player.
   *
   * @param contract_expiration_date the contract expiration date of the player
   */
  public void setContract_expiration_date(LocalDate contract_expiration_date) {
    this.contract_expiration_date = contract_expiration_date;
  }

  /**
   * Gets the agent name of the player.
   *
   * @return the agent name of the player
   */
  public String getAgent_name() {
    return agent_name;
  }

  /**
   * Sets the agent name of the player.
   *
   * @param agent_name the agent name of the player
   */
  public void setAgent_name(String agent_name) {
    this.agent_name = agent_name;
  }

  /**
   * Gets the image URL of the player.
   *
   * @return the image URL of the player
   */
  public String getImage_url() {
    return image_url;
  }

  /**
   * Sets the image URL of the player.
   *
   * @param image_url the image URL of the player
   */
  public void setImage_url(String image_url) {
    this.image_url = image_url;
  }

  /**
   * Gets the URL of the player.
   *
   * @return the URL of the player
   */
  public String getUrl() {
    return url;
  }

  /**
   * Sets the URL of the player.
   *
   * @param url the URL of the player
   */
  public void setUrl(String url) {
    this.url = url;
  }

  /**
   * Gets the current club domestic competition ID.
   *
   * @return the current club domestic competition ID
   */
  public String getCurrent_club_domestic_competition_id() {
    return current_club_domestic_competition_id;
  }

  /**
   * Sets the current club domestic competition ID.
   *
   * @param current_club_domestic_competition_id the current club domestic competition ID
   */
  public void setCurrent_club_domestic_competition_id(String current_club_domestic_competition_id) {
    this.current_club_domestic_competition_id = current_club_domestic_competition_id;
  }

  /**
   * Gets the current club name of the player.
   *
   * @return the current club name of the player
   */
  public String getCurrent_club_name() {
    return current_club_name;
  }

  /**
   * Sets the current club name of the player.
   *
   * @param current_club_name the current club name of the player
   */
  public void setCurrent_club_name(String current_club_name) {
    this.current_club_name = current_club_name;
  }

  /**
   * Gets the age of the player.
   *
   * @return the age of the player
   */
  public int getAge() {
    return this.age;
  }

  /**
   * Sets the age of the player.
   *
   * @param age the age of the player (possibly unused)
   */
  public void setAge(int age) {
    this.age = age;
  }

  /**
   * Gets the market value of the player.
   *
   * @return the market value of the player
   */
  public int getMarket_value() {
    return this.market_value;
  }

  /**
   * Sets the market value of the player.
   *
   * @param value the market value of the player (possibly unused)
   */
  public void setMarket_value(int value) {
    this.market_value = value;
  }

  /**
   * Gets the highest market value of the player.
   *
   * @return the highest market value of the player
   */
  public int getHighest_market_value() {
    return this.highest_market_value;
  }

  /**
   * Sets the highest market value of the player.
   *
   * @param value the highest market value of the player (possibly unused)
   */
  public void setHighest_market_value(int value) {
    this.highest_market_value = value;
  }

}
