package com.footbrawl.postgresapi.playervaluation;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table
public class PlayerValuation {
  @Id
  private String id;
  private int player_id;
  private int last_season;
  private Date datetime;
  private Date date;
  private Date dateweek;
  private int market_value_in_eur; //Forse dev'essere di tipo String
  private int n;
  private int current_club_id;
  private String player_club_domestic_competition_id;

  public PlayerValuation(){

  }

  public PlayerValuation(String id, int player_id, int last_season, Date datetime, Date date, Date dateweek, int market_value_in_eur, int n, int current_club_id, String player_club_domestic_competition_id) {
    this.id = id;
    this.player_id = player_id;
    this.last_season = last_season;
    this.datetime = datetime;
    this.date = date;
    this.dateweek = dateweek;
    this.market_value_in_eur = market_value_in_eur;
    this.n = n;
    this.current_club_id = current_club_id;
    this.player_club_domestic_competition_id = player_club_domestic_competition_id;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public int getPlayer_id() {
    return player_id;
  }

  public void setPlayer_id(int player_id) {
    this.player_id = player_id;
  }

  public int getLast_season() {
    return last_season;
  }

  public void setLast_season(int last_season) {
    this.last_season = last_season;
  }

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public Date getDateweek() {
    return dateweek;
  }

  public void setDateweek(Date dateweek) {
    this.dateweek = dateweek;
  }

  public int getMarket_value_in_eur() {
    return market_value_in_eur;
  }

  public void setMarket_value_in_eur(int market_value_in_eur) {
    this.market_value_in_eur = market_value_in_eur;
  }

  public int getN() {
    return n;
  }

  public void setN(int n) {
    this.n = n;
  }

  public int getCurrent_club_id() {
    return current_club_id;
  }

  public void setCurrent_club_id(int current_club_id) {
    this.current_club_id = current_club_id;
  }

  public String getPlayer_club_domestic_competition_id() {
    return player_club_domestic_competition_id;
  }

  public void setPlayer_club_domestic_competition_id(String player_club_domestic_competition_id) {
    this.player_club_domestic_competition_id = player_club_domestic_competition_id;
  }

}
