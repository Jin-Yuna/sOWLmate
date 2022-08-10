package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.dto.request.LetterRequestDto;
import com.ssafy.sowlmate.entity.BlackList;
import com.ssafy.sowlmate.entity.Letter;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.LetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LetterService {

    private final LetterRepository letterRepository;
    private final UserService userService;
    private final BlackListService blackListService;

    /**
     * 받은 편지 전체 리스트 (내가 설정한 블랙리스트가 보낸 편지는 가져오지 않는다.)
     * 향후 수정 필요(블랙리스트-유저 구조 수정 선행 필요)
     */
    public List<Letter> selectAllByToUserId(String toUserId) {
        List<Letter> result = new ArrayList<>();
        // 편지를 받은 사람 기준 블랙리스트를 불러온다.
        List<BlackList> blackLists = blackListService.selectAllByFromUserId(toUserId);
        // 블랙리스트로 지정된 유저를 불러온다.
        List<User> users = new ArrayList<>();
        for (BlackList blackList : blackLists) users.add(blackList.getToUser());
        // 편지를 보낸 사람이 블랙리스트에 포함되어 있다면 반환하지 않는다.
        for (Letter letter : letterRepository.findAllByToUserId(toUserId)) {
            if (!users.contains(letter.getFromUser())) {
                result.add(letter);
            }
        }
        return result;
    }

    /**
     * 단일 편지 조회 (읽음 표시)
     */
    @Transactional
    public Letter selectByNo(Long letterNo) {
        Letter letter = letterRepository.findByNo(letterNo);
        letter.read();
        return letter;
    }

    /**
     * 편지 등록
     */
    @Transactional
    public Letter enrollLetter(LetterRequestDto requestDto) {
        User fromUser = userService.selectById(requestDto.getFromUserId());
        User toUser = userService.selectById(requestDto.getToUserId());
        return letterRepository.save(Letter.createLetter(fromUser, toUser,
                requestDto.getTitle(), requestDto.getContent()));
    }

    /**
     * 좋아요
     */
    @Transactional
    public boolean onFavorite(Long letterNo) {
        Letter letter = letterRepository.findByNo(letterNo);
        return letter.favoriteOn();
    }

    /**
     * 좋아요 취소
     */
    @Transactional
    public boolean offFavorite(Long letterNo) {
        Letter letter = letterRepository.findByNo(letterNo);
        return letter.favoriteOff();
    }
}
