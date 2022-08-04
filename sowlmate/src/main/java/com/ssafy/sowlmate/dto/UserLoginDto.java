package com.ssafy.sowlmate.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UserLoginDto {
    private String id;
    private String password;
}
