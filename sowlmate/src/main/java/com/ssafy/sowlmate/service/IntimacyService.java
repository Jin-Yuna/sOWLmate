package com.ssafy.sowlmate.service;

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
    public Intimacy enrollIntimacy(String fromUserId, String toUserId, int eval) {
        User fromUser = userService.selectById(fromUserId);
        User toUser = userService.selectById(toUserId);

        Intimacy intimacy = Intimacy.createIntimacy(fromUser, toUser, eval);

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
     * 단일 조회
     */
    public Intimacy selectByFromUserIdAndToUserId(String fromUserId, String toUserId) {
        return intimacyRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
    }

    /**
     * 수정 - 긍정평가
     */
    @Transactional
    public int evalPositive(String fromUserId, String toUserId, int amount) {
        Intimacy intimacy = selectByFromUserIdAndToUserId(fromUserId, toUserId);
        intimacy.positive(amount);
        return intimacy.getEval();
    }

    /**
     * 수정 - 부정평가
     */
    @Transactional
    public int evalNegative(String fromUserId, String toUserId, int amount) {
        Intimacy intimacy = selectByFromUserIdAndToUserId(fromUserId, toUserId);
        intimacy.negative(amount);
        return intimacy.getEval();
    }
}
