package com.ssafy.sowlmate.service;

import com.ssafy.sowlmate.dto.request.IntimacyRequestDto;
import com.ssafy.sowlmate.entity.Intimacy;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.repository.IntimacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IntimacyService {

    private final IntimacyRepository intimacyRepository;
    private final UserService userService;

    /**
     * 등록
     */
    @Transactional
    public Intimacy enrollIntimacy(IntimacyRequestDto requestDto) {
        User fromUser = userService.selectById(requestDto.getFromUserId());
        User toUser = userService.selectById(requestDto.getToUserId());
        Intimacy intimacy = Intimacy.createIntimacy(fromUser, toUser, requestDto.getEval());
        return intimacyRepository.save(intimacy);
    }

    /**
     * 전체 조회
     */
    public List<Intimacy> selectAll() {
        return intimacyRepository.findAll();
    }

    /**
     * 유저별 조회
     */
    public List<Intimacy> selectAllByFromUserId(String fromUserId) {
        return intimacyRepository.findAllByFromUserId(fromUserId);
    }

    /**
     * 단일 조회1
     */
    public Intimacy selectByFromUserIdAndToUserId(IntimacyRequestDto requestDto) {
        return intimacyRepository.findByFromUserIdAndToUserId(requestDto.getFromUserId(), requestDto.getToUserId());
    }

    /**
     * 단일 조회2
     */
    public Intimacy selectByFromUserIdAndToUserId2(String fromUserId, String toUserId) {
        return intimacyRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
    }

    /**
     * 수정 - 긍정평가
     */
    @Transactional
    public int evalPositive(IntimacyRequestDto requestDto) {
        Intimacy intimacy = selectByFromUserIdAndToUserId(requestDto);
        intimacy.positive(requestDto.getEval());
        return intimacy.getEval();
    }

    /**
     * 수정 - 부정평가
     */
    @Transactional
    public int evalNegative(IntimacyRequestDto requestDto) {
        Intimacy intimacy = selectByFromUserIdAndToUserId(requestDto);
        intimacy.negative(requestDto.getEval());
        return intimacy.getEval();
    }
}
