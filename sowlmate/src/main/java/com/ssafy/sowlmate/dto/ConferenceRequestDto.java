package com.ssafy.sowlmate.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@NoArgsConstructor
public class ConferenceRequestDto {
    private String userId;
    private Long conferenceNo;
}
