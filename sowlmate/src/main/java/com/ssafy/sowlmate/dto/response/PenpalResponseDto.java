package com.ssafy.sowlmate.dto.response;

import com.ssafy.sowlmate.entity.Interest;
import com.ssafy.sowlmate.entity.Intimacy;
import com.ssafy.sowlmate.entity.Penpal;
import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.entity.type.LanguageType;
import com.ssafy.sowlmate.entity.type.RegionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter @Setter
@NoArgsConstructor
public class PenpalResponseDto {
    private String id;
    private String nickname;
    private RegionType region;
    private LanguageType language;
    private LanguageType preferenceLanguage;
    private List<Interest> interests;
    private int intimacyEval;

    public static PenpalResponseDto toDto(Penpal penpal) {
        PenpalResponseDto dto = new PenpalResponseDto();
        dto.setId(penpal.getToUser().getId());
        dto.setNickname(penpal.getToUser().getNickname());
        dto.setRegion(penpal.getToUser().getRegion());
        dto.setLanguage(penpal.getToUser().getLanguage());
        dto.setPreferenceLanguage(penpal.getToUser().getPreferenceLanguage());
        dto.setInterests(penpal.getToUser().getInterests());
        return dto;
    }
}
