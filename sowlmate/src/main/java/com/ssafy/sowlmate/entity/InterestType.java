package com.ssafy.sowlmate.entity;

public enum InterestType {
    FOOD("Kimchi..."),
    MUSIC("Dynamite"),
    DANCE("Shuffle");

    private final String contents;

    private InterestType(String s) {
        contents = s;
    }
}