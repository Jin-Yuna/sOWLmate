package com.ssafy.sowlmate.dto;

import com.ssafy.sowlmate.entity.User;
import com.ssafy.sowlmate.entity.UserLanStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@NoArgsConstructor
public class UserInfoDto {

    private String id;
    private String nickname;
    private String region;
    private UserLanStatus language;

    public static UserInfoDto toDto(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setNickname(user.getNickname());
        userInfoDto.setRegion(user.getRegion());
        userInfoDto.setLanguage(user.getLanguage());
        return userInfoDto;
    }

}
