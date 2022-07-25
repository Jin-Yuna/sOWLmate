package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.*;
import com.ssafy.sowlmate.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("conference")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;

    /**
     * 개설된 방 전체 조회
     */
    @GetMapping("conference")
    public List<Conference> conferenceList(){
        return conferenceService.selectAll();
    }

    /**
     * 관심사별 방 조회
     */
    @GetMapping("conference")
    public List<Conference> conferenceInterestList(InterestType interest){
        return conferenceService.selectByInterest(interest);
    }

    /**
     * 언어별 방 조회
     */
    @GetMapping("conference")
    public List<Conference> conferenceLanguageList(UserLanStatus language){
        return conferenceService.selectByLanguage(language);
    }

    /**
     * 관심사+언어 방 조회
     */
    @GetMapping("conference")
    public List<Conference> conferenceInterestAndLanguageList(InterestType interest, UserLanStatus language){
        return conferenceService.selectByInterestAndLanguage(interest, language);
    }

    /**
     * 방 생성
     */
    @PostMapping("{conferenceId}")
    public Conference createConference(@PathVariable Long conferenceId, InterestType interestType, UserLanStatus language,
                                       List<User> participants, boolean lock, String conferenceTitle){
        return conferenceService.createConference(conferenceId, interestType, language, participants, lock, conferenceTitle);
    }

    /**
     * 방 랜덤 입장
     */
    public void enterRandomConference(InterestType interst, UserLanStatus language){

    }

}
