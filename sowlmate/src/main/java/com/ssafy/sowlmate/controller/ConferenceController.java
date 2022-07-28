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
    @GetMapping("interest")
    public List<Conference> conferenceInterestList(InterestType interest){
        return conferenceService.selectByInterest(interest);
    }

    /**
     * 언어별 방 조회
     */
    @GetMapping("language")
    public List<Conference> conferenceLanguageList(UserLanStatus language){
        return conferenceService.selectByLanguage(language);
    }

    /**
     * 관심사+언어 방 조회
     */
    @GetMapping("both")
    public List<Conference> conferenceInterestAndLanguageList(InterestType interest, UserLanStatus language){
        return conferenceService.selectByInterestAndLanguage(interest, language);
    }

    /**
     * 방 생성
     */
    @PostMapping
    public Conference createConference(Conference conference, String userId){
        return conferenceService.createConference(conference, userId);
    }

    /**
     * 방 입장
     */
    @PutMapping
    public void enterConference(long coneference, String userId) {
        conferenceService.enterConference(coneference, userId);
    }

    /**
     * 방 삭제 or 나가기
     */
    @DeleteMapping
    public void deleteOrExitConference(long conferenceNo, String userId){
        conferenceService.deleteOrExitConference(conferenceNo, userId);
    }
}


