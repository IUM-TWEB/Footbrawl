package com.footbrawl.postgresapi.player;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.time.LocalDate;

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


  public Player(){

  }

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

  public Long getPlayer_id() {
    return player_id;
  }

  public void setPlayer_id(Long playerId) {
    this.player_id = playerId;
  }

  public String getFirst_name() {
    return first_name;
  }

  public void setFirst_name(String first_name) {
    this.first_name = first_name;
  }

  public String getLast_name() {
    return last_name;
  }

  public void setLast_name(String last_name) {
    this.last_name = last_name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getLast_season() {
    return last_season;
  }

  public void setLast_season(Integer last_season) {
    this.last_season = last_season;
  }

  public Integer getCurrent_club_id() {
    return current_club_id;
  }

  public void setCurrent_club_id(Integer current_club_id) {
    this.current_club_id = current_club_id;
  }

  public String getPlayer_code() {
    return player_code;
  }

  public void setPlayer_code(String player_code) {
    this.player_code = player_code;
  }

  public String getCountry_of_birth() {
    return country_of_birth;
  }

  public void setCountry_of_birth(String country_of_birth) {
    this.country_of_birth = country_of_birth;
  }

  public String getCity_of_birth() {
    return city_of_birth;
  }

  public void setCity_of_birth(String city_of_birth) {
    this.city_of_birth = city_of_birth;
  }

  public String getCountry_of_citizenship() {
    return country_of_citizenship;
  }

  public void setCountry_of_citizenship(String country_of_citizenship) {
    this.country_of_citizenship = country_of_citizenship;
  }

  public LocalDate getDate_of_birth() {
    return date_of_birth;
  }

  public void setDate_of_birth(LocalDate date_of_birth) {
    this.date_of_birth = date_of_birth;
  }

  public String getSub_position() {
    return sub_position;
  }

  public void setSub_position(String sub_position) {
    this.sub_position = sub_position;
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

  public Integer getHeight_in_cm() {
    return height_in_cm;
  }

  public void setHeight_in_cm(Integer height_in_cm) {
    this.height_in_cm = height_in_cm;
  }

  public String getMarket_value_in_eur() {
    return market_value_in_eur;
  }

  public void setMarket_value_in_eur(String market_value_in_eur) {
    this.market_value_in_eur = market_value_in_eur;
  }

  public String getHighest_market_value_in_eur() {
    return highest_market_value_in_eur;
  }

  public void setHighest_market_value_in_eur(String highest_market_value_in_eur) {
    this.highest_market_value_in_eur = highest_market_value_in_eur;
  }

  public LocalDate getContract_expiration_date() {
    return contract_expiration_date;
  }

  public void setContract_expiration_date(LocalDate contract_expiration_date) {
    this.contract_expiration_date = contract_expiration_date;
  }

  public String getAgent_name() {
    return agent_name;
  }

  public void setAgent_name(String agent_name) {
    this.agent_name = agent_name;
  }

  public String getImage_url() {
    return image_url;
  }

  public void setImage_url(String image_url) {
    this.image_url = image_url;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getCurrent_club_domestic_competition_id() {
    return current_club_domestic_competition_id;
  }

  public void setCurrent_club_domestic_competition_id(String current_club_domestic_competition_id) {
    this.current_club_domestic_competition_id = current_club_domestic_competition_id;
  }

  public String getCurrent_club_name() {
    return current_club_name;
  }

  public void setCurrent_club_name(String current_club_name) {
    this.current_club_name = current_club_name;
  }

  public int getAge(){
    return this.age;
  }

  public void setAge(int age){ // forse non serve
    this.age = age;
  }

  public int getMarket_value(){
    return this.market_value;
  }

  public void setMarket_value(int value){ // forse non serve
    this.market_value = value;
  }

  public int getHighest_market_value(){
    return this.highest_market_value;
  }

  public void setHighest_market_value(int value){ // forse non serve
    this.highest_market_value = value;
  }

}
