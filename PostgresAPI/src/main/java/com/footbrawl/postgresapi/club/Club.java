package com.footbrawl.postgresapi.club;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

/**
 * Entity class representing a Club.
 */
@Entity
@Table(name = "clubs")
public class Club {

  @Id
  private Long club_id;
  private String club_code;
  private String name;
  private String domestic_competition_id;
  private Double total_market_value;
  private int squad_size;
  private Float average_age;
  private int foreigners_number;
  private Float foreigners_percentage;
  private int national_team_players;
  private String stadium_name;
  private int stadium_seats;
  private String net_transfer_record;
  private String coach_name;
  private int last_season;
  private String url;
  @Transient
  private int net_transfer_rec;
  @Transient
  private int total_market_val;

  /**
   * Default constructor.
   */
  public Club() {

  }

  /**
   * Constructor with all fields.
   *
   * @param club_id                 the ID of the club
   * @param club_code               the code of the club
   * @param name                    the name of the club
   * @param domestic_competition_id the ID of the domestic competition
   * @param total_market_value      the total market value of the club
   * @param squad_size              the size of the squad
   * @param average_age             the average age of the squad
   * @param foreigners_number       the number of foreign players
   * @param foreigners_percentage   the percentage of foreign players
   * @param national_team_players   the number of national team players
   * @param stadium_name            the name of the stadium
   * @param stadium_seats           the number of stadium seats
   * @param net_transfer_record     the net transfer record
   * @param coach_name              the name of the coach
   * @param last_season             the last season
   * @param url                     the URL of the club
   */
  public Club(Long club_id, String club_code, String name, String domestic_competition_id, Double total_market_value, int squad_size, Float average_age, int foreigners_number, Float foreigners_percentage, int national_team_players, String stadium_name, int stadium_seats, String net_transfer_record, String coach_name, int last_season, String url) {
    this.club_id = club_id;
    this.club_code = club_code;
    this.name = name;
    this.domestic_competition_id = domestic_competition_id;
    this.total_market_value = total_market_value;
    this.squad_size = squad_size;
    this.average_age = average_age;
    this.foreigners_number = foreigners_number;
    this.foreigners_percentage = foreigners_percentage;
    this.national_team_players = national_team_players;
    this.stadium_name = stadium_name;
    this.stadium_seats = stadium_seats;
    this.net_transfer_record = net_transfer_record;
    this.coach_name = coach_name;
    this.last_season = last_season;
    this.url = url;
    this.net_transfer_rec = getNet_transfer_rec();
    this.total_market_val = getTotal_market_val();
  }

  /**
   * Gets the club ID.
   *
   * @return the club ID
   */
  public Long getClub_id() {
    return club_id;
  }

  /**
   * Sets the club ID.
   *
   * @param club_id the club ID
   */
  public void setClub_id(Long club_id) {
    this.club_id = club_id;
  }

  /**
   * Gets the club code.
   *
   * @return the club code
   */
  public String getClub_code() {
    return club_code;
  }

  /**
   * Sets the club code.
   *
   * @param club_code the club code
   */
  public void setClub_code(String club_code) {
    this.club_code = club_code;
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
  public String getDomestic_competition_id() {
    return domestic_competition_id;
  }

  /**
   * Sets the domestic competition ID.
   *
   * @param domestic_competition_id the domestic competition ID
   */
  public void setDomestic_competition_id(String domestic_competition_id) {
    this.domestic_competition_id = domestic_competition_id;
  }

  /**
   * Gets the total market value of the club.
   *
   * @return the total market value of the club
   */
  public Double getTotal_market_value() {
    return total_market_value;
  }

  /**
   * Sets the total market value of the club.
   *
   * @param total_market_value the total market value of the club
   */
  public void setTotal_market_value(Double total_market_value) {
    this.total_market_value = total_market_value;
  }

  /**
   * Gets the size of the squad.
   *
   * @return the size of the squad
   */
  public int getSquad_size() {
    return squad_size;
  }

  /**
   * Sets the size of the squad.
   *
   * @param squad_size the size of the squad
   */
  public void setSquad_size(int squad_size) {
    this.squad_size = squad_size;
  }

  /**
   * Gets the average age of the squad.
   *
   * @return the average age of the squad
   */
  public Float getAverage_age() {
    return average_age;
  }

  /**
   * Sets the average age of the squad.
   *
   * @param average_age the average age of the squad
   */
  public void setAverage_age(Float average_age) {
    this.average_age = average_age;
  }

  /**
   * Gets the number of foreign players.
   *
   * @return the number of foreign players
   */
  public int getForeigners_number() {
    return foreigners_number;
  }

  /**
   * Sets the number of foreign players.
   *
   * @param foreigners_number the number of foreign players
   */
  public void setForeigners_number(int foreigners_number) {
    this.foreigners_number = foreigners_number;
  }

  /**
   * Gets the percentage of foreign players.
   *
   * @return the percentage of foreign players
   */
  public Float getForeigners_percentage() {
    return foreigners_percentage;
  }

  /**
   * Sets the percentage of foreign players.
   *
   * @param foreigners_percentage the percentage of foreign players
   */
  public void setForeigners_percentage(Float foreigners_percentage) {
    this.foreigners_percentage = foreigners_percentage;
  }

  /**
   * Gets the number of national team players.
   *
   * @return the number of national team players
   */
  public int getNational_team_players() {
    return national_team_players;
  }

  /**
   * Sets the number of national team players.
   *
   * @param national_team_players the number of national team players
   */
  public void setNational_team_players(int national_team_players) {
    this.national_team_players = national_team_players;
  }

  /**
   * Gets the name of the stadium.
   *
   * @return the name of the stadium
   */
  public String getStadium_name() {
    return stadium_name;
  }

  /**
   * Sets the name of the stadium.
   *
   * @param stadium_name the name of the stadium
   */
  public void setStadium_name(String stadium_name) {
    this.stadium_name = stadium_name;
  }

  /**
   * Gets the number of stadium seats.
   *
   * @return the number of stadium seats
   */
  public int getStadium_seats() {
    return stadium_seats;
  }

  /**
   * Sets the number of stadium seats.
   *
   * @param stadium_seats the number of stadium seats
   */
  public void setStadium_seats(int stadium_seats) {
    this.stadium_seats = stadium_seats;
  }

  /**
   * Gets the net transfer record.
   *
   * @return the net transfer record
   */
  public String getNet_transfer_record() {
    return net_transfer_record;
  }

  /**
   * Sets the net transfer record.
   *
   * @param net_transfer_record the net transfer record
   */
  public void setNet_transfer_record(String net_transfer_record) {
    this.net_transfer_record = net_transfer_record;
  }

  /**
   * Gets the name of the coach.
   *
   * @return the name of the coach
   */
  public String getCoach_name() {
    return coach_name;
  }

  /**
   * Sets the name of the coach.
   *
   * @param coach_name the name of the coach
   */
  public void setCoach_name(String coach_name) {
    this.coach_name = coach_name;
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
   * Gets the URL of the club.
   *
   * @return the URL of the club
   */
  public String getUrl() {
    return url;
  }

  /**
   * Sets the URL of the club.
   *
   * @param url the URL of the club
   */
  public void setUrl(String url) {
    this.url = url;
  }

  /**
   * Gets the net transfer record.
   *
   * @return the net transfer record
   */
  public int getNet_transfer_rec() {
    return this.net_transfer_rec;
  }

  /**
   * Sets the net transfer record.
   *
   * @param value the net transfer record
   */
  public void setNet_transfer_rec(int value) {
    this.net_transfer_rec = value;
  }

  /**
   * Gets the total market value.
   *
   * @return the total market value
   */
  public int getTotal_market_val() {
    return this.total_market_val;
  }

  /**
   * Sets the total market value.
   *
   * @param value the total market value
   */
  public void setTotal_market_val(int value) {
    this.total_market_val = value;
  }

}
