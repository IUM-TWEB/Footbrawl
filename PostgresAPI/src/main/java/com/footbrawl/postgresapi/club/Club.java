package com.footbrawl.postgresapi.club;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table
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

  public Club() {

  }

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

  public Long getClub_id() {
    return club_id;
  }

  public void setClub_id(Long club_id) {
    this.club_id = club_id;
  }

  public String getClub_code() {
    return club_code;
  }

  public void setClub_code(String club_code) {
    this.club_code = club_code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDomestic_competition_id() {
    return domestic_competition_id;
  }

  public void setDomestic_competition_id(String domestic_competition_id) {
    this.domestic_competition_id = domestic_competition_id;
  }

  public Double getTotal_market_value() {
    return total_market_value;
  }

  public void setTotal_market_value(Double total_market_value) {
    this.total_market_value = total_market_value;
  }

  public int getSquad_size() {
    return squad_size;
  }

  public void setSquad_size(int squad_size) {
    this.squad_size = squad_size;
  }

  public Float getAverage_age() {
    return average_age;
  }

  public void setAverage_age(Float average_age) {
    this.average_age = average_age;
  }

  public int getForeigners_number() {
    return foreigners_number;
  }

  public void setForeigners_number(int foreigners_number) {
    this.foreigners_number = foreigners_number;
  }

  public Float getForeigners_percentage() {
    return foreigners_percentage;
  }

  public void setForeigners_percentage(Float foreigners_percentage) {
    this.foreigners_percentage = foreigners_percentage;
  }

  public int getNational_team_players() {
    return national_team_players;
  }

  public void setNational_team_players(int national_team_players) {
    this.national_team_players = national_team_players;
  }

  public String getStadium_name() {
    return stadium_name;
  }

  public void setStadium_name(String stadium_name) {
    this.stadium_name = stadium_name;
  }

  public int getStadium_seats() {
    return stadium_seats;
  }

  public void setStadium_seats(int stadium_seats) {
    this.stadium_seats = stadium_seats;
  }

  public String getNet_transfer_record() {
    return net_transfer_record;
  }

  public void setNet_transfer_record(String net_transfer_record) {
    this.net_transfer_record = net_transfer_record;
  }

  public String getCoach_name() {
    return coach_name;
  }

  public void setCoach_name(String coach_name) {
    this.coach_name = coach_name;
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

  public int getNet_transfer_rec() {
    return this.net_transfer_rec;
  }

  public void setNet_transfer_rec(int value) {
    this.net_transfer_rec = value;
  }

  public int getTotal_market_val() {
    return this.total_market_val;
  }

  public void setTotal_market_val(int value) {
    this.total_market_val = value;
  }

}
