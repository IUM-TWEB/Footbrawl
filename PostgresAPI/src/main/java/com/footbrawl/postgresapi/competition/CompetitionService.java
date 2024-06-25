package com.footbrawl.postgresapi.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing competition-related operations.
 */
@Service
public class CompetitionService {

  private final CompetitionRepository competitionRepository;

  /**
   * Constructor for CompetitionService.
   *
   * @param competitionRepository the competition repository
   */
  @Autowired
  public CompetitionService(CompetitionRepository competitionRepository) {
    this.competitionRepository = competitionRepository;
  }

  /**
   * Retrieves a competition by its ID.
   *
   * @param id the ID of the competition
   * @return the CompetitionDTO if found, or null if not found
   */
  public CompetitionDTO getCompetition(String id) {
    Competition competition = competitionRepository.findCompetitionByIdCustomQuery(id).orElse(null);
    if (competition == null)
      return null;
    return convertToDTO(competition);
  }

  /**
   * Retrieves competitions by their name.
   *
   * @param name the name of the competition
   * @return a list of CompetitionDTOs if found, or null if not found
   */
  public List<CompetitionDTO> getCompetitionByName(String name) {
    List<Competition> competitionList = competitionRepository.findCompetitionByNameCustomQuery(name).orElse(null);
    if (competitionList == null || competitionList.isEmpty())
      return null;

    List<CompetitionDTO> competitionDTOList = new ArrayList<>(competitionList.size());
    for (Competition competition : competitionList)
      competitionDTOList.add(convertToDTO(competition));

    return competitionDTOList;
  }

  /**
   * Converts a Competition entity to a CompetitionDTO.
   *
   * @param competition the Competition entity
   * @return the CompetitionDTO representing the competition
   */
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
