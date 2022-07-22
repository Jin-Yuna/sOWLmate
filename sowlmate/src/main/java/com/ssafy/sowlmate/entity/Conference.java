package com.ssafy.sowlmate.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@RequiredArgsConstructor
public class Conference {

    @Id @GeneratedValue
    @Column(name = "conference_id")
    private Long no;

    @NotNull
    private int ownerId;

    @NotNull
    private InterestType interest;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserLanStatus language;

    @NotNull
    @OneToMany(mappedBy = "conference")
    private List<User> participants = new ArrayList<>();

    @NotNull
    @ColumnDefault("false")
    private boolean lock;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private String thumbnail;

    @NotNull
    @ColumnDefault("Title")
    private String conferenceTitle;

    private LocalDateTime timeRecordStart;

}
