package com.ssafy.sowlmate.entity;

import com.ssafy.sowlmate.entity.type.InterestType;
import com.ssafy.sowlmate.entity.type.LanguageType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@RequiredArgsConstructor
public class Conference {

    @Id @GeneratedValue
    @Column(name = "conference_id")
    private Long no;

    @NotNull
    @ColumnDefault("Title")
    private String conferenceTitle;

    @NotNull
    private String ownerId;

    private String participantId;

    @NotNull
    private InterestType interest;

    @NotNull
    @Enumerated(EnumType.STRING)
    private LanguageType language;

//    @NotNull
//    @OneToMany(mappedBy = "conference")
//    private List<User> participants = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private LockStatus lock;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private String thumbnail;

    private LocalDateTime timeRecordStart;

}
