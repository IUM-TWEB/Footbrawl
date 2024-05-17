package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompetitionService {
  private final CompetitionRepository competitionRepository;

  @Autowired
  public CompetitionService(CompetitionRepository competitionRepository) {
    this.competitionRepository = competitionRepository;
  }

  public CompetitionDTO getCompetition(String id) {
    Competition competition = competitionRepository.findCompetitionByIdCustomQuery(id).orElse(null);
    if (competition == null)
      return null;
    return convertToDTO(competition);
  }

  public List<CompetitionDTO> getCompetitionByName(String name) {
    List<Competition> competitionList = competitionRepository.findCompetitionByNameCustomQuery(name).orElse(null);
    if (competitionList == null || competitionList.isEmpty())
      return null;

    List<CompetitionDTO> competitionDTOList = new ArrayList<>(competitionList.size());
    for (Competition competition : competitionList)
      competitionDTOList.add(convertToDTO(competition));

    return competitionDTOList;
  }

  public CompetitionDTO convertToDTO(Competition competition) {
    CompetitionDTO competitionDTO = new CompetitionDTO();
    competitionDTO.setCompetitionId(competition.getCompetition_id());
    competitionDTO.setName(competition.getName());
    competitionDTO.setType(competition.getType());
    competitionDTO.setCountryName(competition.getCountry_name());
    competitionDTO.setDomesticLeagueCode(competition.getDomestic_league_code());
    competitionDTO.setConfederation(competition.getConfederation());
    competitionDTO.setUrl(competition.getUrl());
    return competitionDTO;
  }

}
