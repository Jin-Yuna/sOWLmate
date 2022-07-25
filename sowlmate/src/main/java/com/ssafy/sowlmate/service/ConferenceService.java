package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.*;
import com.ssafy.sowlmate.repository.ConferenceRepository;
import com.ssafy.sowlmate.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final Conference conference;
    private final User user;
    private final InterestRepository interestRepository;

    public List<Conference> selectAll() {
        return conferenceRepository.findAll();
    }

    @Transactional
    public List<Conference> selectByInterest(InterestType interest){
        return conferenceRepository.findAllByInterest(interest);
    }

    @Transactional
    public  List<Conference> selectByLanguage(UserLanStatus language){
        return conferenceRepository.findAllByLanguage(language);
    }

    @Transactional
    public List<Conference> selectByInterestAndLanguage(InterestType interest, UserLanStatus language){
        return conferenceRepository.findAllByInterestAndLanguage(interest, language);
    }

    @Transactional
    public Conference createConference(Long conferenceId, InterestType interestType, UserLanStatus language,
                                       List<User> participants, boolean lock, String conferenceTitle){
//        Conference conference = new Conference();
        // conferenceId 자동생성 해야함 (순차 order? e.g. 1 2 3 4 5 6... or random number?? -> 중복 안되게 생성해야 함)
        conference.setNo(conferenceId);
       conference.setConferenceTitle(conferenceTitle);
       conference.setOwnerId(user.getId());
       conference.setInterest(interestType);
       conference.setLanguage(language);
       conference.setParticipants(user.getConference().getParticipants()); // participants user에서 어떻게 하지~
       if(lock==true){
         conference.setLock(lock);
//         conference.setPassword();  // pass 어떻게 하지~
       } else {
           conference.setLock(lock);
       }

        return conferenceRepository.save(conference);
    }

    @Transactional
    public void randomEnter(InterestType interestType, UserLanStatus language){
        List<Conference> findRandomConference = conferenceRepository.findAllByInterestAndLanguage(interestType, language);
        // interest와 language가 같은 방 리스트 findRamdomConference에서 무작위로 하나 선택하여 방 입장

    }


}
