package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.entity.*;
import com.ssafy.sowlmate.entity.type.InterestType;
import com.ssafy.sowlmate.entity.type.LanguageType;
import com.ssafy.sowlmate.repository.ConferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final UserService userService;
    private final InterestService interestService;

    public List<Conference> selectAll() {
        return conferenceRepository.findAll();
    }

    public List<Conference> selectByInterest(InterestType interest){
        return conferenceRepository.findAllByInterest(interest);
    }

    public  List<Conference> selectByLanguage(LanguageType language){
        return conferenceRepository.findAllByLanguage(language);
    }

    public List<Conference> selectByInterestAndLanguage(InterestType interest, LanguageType language){
        return conferenceRepository.findAllByInterestAndLanguage(interest, language);
    }

    @Transactional
    public Conference createConference(Conference conference, String userId){
        User user = userService.selectById(userId);
        Conference newConference = new Conference();
        // conferenceId 자동생성 해야함 (순차 order? e.g. 1 2 3 4 5 6... or random number?? -> 중복 안되게 생성해야 함)
       newConference.setConferenceTitle(newConference.getConferenceTitle());
       newConference.setOwnerId(user.getId());
       newConference.setInterest(newConference.getInterest());
       newConference.setLanguage(newConference.getLanguage());
       if(conference.getLock().equals(LockStatus.LOCK)){
         newConference.setLock(conference.getLock());
         newConference.setPassword(conference.getPassword());  // pass 어떻게 하지~
       } else {
           newConference.setLock(conference.getLock());
       }

        return conferenceRepository.save(newConference);
    }

    @Transactional
    public void enterConference (long conferenceNo, String userId){
        Conference findConference = conferenceRepository.findByNo(conferenceNo);
        findConference.setParticipantId(userId);

        //List<Conference> findR
        //List<Conference> findRandomConference = conferenceRepository.findAllByInterestAndLanguage(interestType, language);
        // interest와 language가 같은 방 리스트 findRamdomConference에서 무작위로 하나 선택하여 방 입장

    }

//    /**
//     * exit conference (only participant)
//     */
//    @Transactional
//    public void exitParticipant(long conferenceNo) {
//        Conference findConference = conferenceRepository.findByNo(conferenceNo);
//        findConference.setParticipantId(null);
//    }
//
//    /**
//     * delete conference (only owner)
//     */
//    @Transactional
//    public int deleteParticipant(long conferenceNo) {
//        return conferenceRepository.deleteByNo(conferenceNo);
//    }

    /**
     * delete or exit
     */
    @Transactional
    public Optional<?> deleteOrExitConference(long conferenceNo, String userId) {
        Conference findConference = conferenceRepository.findByNo(conferenceNo);
        if (findConference.getOwnerId().equals(userId)) {
            return Optional.of(conferenceRepository.deleteByNo(conferenceNo));
        } else {
            findConference.setParticipantId(null);
            return Optional.empty();
        }
    }
}
