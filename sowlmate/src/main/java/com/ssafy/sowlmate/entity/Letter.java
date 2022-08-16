package com.ssafy.sowlmate.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@Table(name = "letter", uniqueConstraints = {
        @UniqueConstraint(name = "letter_uk", columnNames = {"from_user_no", "to_user_no"})
})
public class Letter {
    @Id @GeneratedValue
    @Column(name = "letter_id")
    private Long no;

    @JoinColumn(name = "from_user_no")
    @ManyToOne
    private User fromUser;

    @JoinColumn(name = "to_user_no")
    @ManyToOne
    private User toUser;

    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private boolean isRead = false;
    @NotNull
    private boolean isFavorite = false;
    @NotNull
    private String writingPad;
    @NotNull
    private String writingFont;

    private LocalDateTime createDate;

    // Create Letter
    public static Letter createLetter(User fromUser, User toUser, String title, String content) {
        Letter letter = new Letter();
        letter.setFromUser(fromUser);
        letter.setToUser(toUser);
        letter.setTitle(title);
        letter.setContent(content);
        letter.setCreateDate(LocalDateTime.now());
        return letter;
    }

    // Business Logic
    public boolean read() {
        setRead(true);
        return this.isRead;
    }

    public boolean favoriteOn() {
        setFavorite(true);
        return this.isFavorite;
    }

    public boolean favoriteOff() {
        setFavorite(false);
        return this.isFavorite;
    }
}
