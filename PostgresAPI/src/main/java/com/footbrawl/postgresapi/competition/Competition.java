package com.footbrawl.postgresapi.competition;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
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

  public Competition(){

  }

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

  public String getCompetition_id() {
    return competition_id;
  }

  public void setCompetition_id(String competition_id) {
    this.competition_id = competition_id;
  }

  public String getCompetition_code() {
    return competition_code;
  }

  public void setCompetition_code(String competition_code) {
    this.competition_code = competition_code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSub_type() {
    return sub_type;
  }

  public void setSub_type(String sub_type) {
    this.sub_type = sub_type;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public int getCountry_id() {
    return country_id;
  }

  public void setCountry_id(int country_id) {
    this.country_id = country_id;
  }

  public String getCountry_name() {
    return country_name;
  }

  public void setCountry_name(String country_name) {
    this.country_name = country_name;
  }

  public String getDomestic_league_code() {
    return domestic_league_code;
  }

  public void setDomestic_league_code(String domestic_league_code) {
    this.domestic_league_code = domestic_league_code;
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
