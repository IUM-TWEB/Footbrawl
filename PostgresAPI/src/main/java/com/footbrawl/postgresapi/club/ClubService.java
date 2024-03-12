package com.footbrawl.postgresapi.club;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClubService {
  @Autowired
  private ClubRepository clubRepository;
}
