package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.dto.ConferenceRequestDto;
import com.ssafy.sowlmate.entity.*;
import com.ssafy.sowlmate.entity.type.InterestType;
import com.ssafy.sowlmate.entity.type.LanguageType;
import com.ssafy.sowlmate.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("list")
    public List<Conference> conferenceList(){
        return conferenceService.selectAll();
    }

    /**
     * 관심사별 방 조회
     */
    @GetMapping("list/interest")
    public List<Conference> conferenceInterestList(InterestType interest) {
        return conferenceService.selectByInterest(interest);
    }

    /**
     * 언어별 방 조회
     */
    @GetMapping("list/language")
    public List<Conference> conferenceLanguageList(LanguageType language) {
        return conferenceService.selectByLanguage(language);
    }

    /**
     * 관심사+언어 방 조회
     */
    @GetMapping("list/both")
    public List<Conference> conferenceInterestAndLanguageList(InterestType interest, LanguageType language) {
        return conferenceService.selectByInterestAndLanguage(interest, language);
    }

    /**
     * 방 생성
     */
    @PostMapping("create")
    public ResponseEntity<Conference> createConference(@RequestBody Conference conference) {
        return ResponseEntity.ok().body(conferenceService.createConference(conference));
    }

    /**
     * 방 입장
     */
    @PutMapping("enter")
    public ResponseEntity<Conference> enterConference(@RequestBody ConferenceRequestDto conferenceRequestDto) {
        return ResponseEntity.ok().body(conferenceService.enterConference(conferenceRequestDto));
    }

    /**
     * 방 삭제 or 나가기
     */
    @DeleteMapping("exit")
    public ResponseEntity<?> deleteOrExitConference(@RequestBody ConferenceRequestDto conferenceRequestDto) {
        return ResponseEntity.ok().body(conferenceService.deleteOrExitConference(conferenceRequestDto));
    }
}


