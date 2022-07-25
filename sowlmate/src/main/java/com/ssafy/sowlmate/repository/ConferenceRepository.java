package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.Conference;
import com.ssafy.sowlmate.entity.Interest;
import com.ssafy.sowlmate.entity.InterestType;
import com.ssafy.sowlmate.entity.UserLanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    List<Conference> findAllByInterest(InterestType interest);

    List<Conference> findAllByLanguage(UserLanStatus language);

    List<Conference> findAllByInterestAndLanguage(InterestType interest, UserLanStatus language);

}
