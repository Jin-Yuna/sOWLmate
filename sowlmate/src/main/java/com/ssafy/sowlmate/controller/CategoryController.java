package com.ssafy.sowlmate.controller;

import com.ssafy.sowlmate.entity.type.InterestType;
import com.ssafy.sowlmate.entity.type.RegionType;
import com.ssafy.sowlmate.entity.type.LanguageType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @GetMapping("interest")
    public List<String> getInterestTypes() {
        List<String> interestTypeList = new ArrayList<>();

        for (InterestType value : InterestType.values()) {
            interestTypeList.add(value.toString());
        }

        return interestTypeList;
    }

    @GetMapping("obj/interest")
    public Map<String, String> getInterestObjs() {
        Map<String, String> interestTypeList = new HashMap<>();

        for (InterestType value : InterestType.values()) {
            interestTypeList.put(value.toString(), value.getContent());
        }

        return interestTypeList;
    }

    @GetMapping("region")
    public List<String> getRegions() {
        List<String> regionList = new ArrayList<>();

        for (RegionType regionType : RegionType.values()) {
            regionList.add(regionType.toString());
        }

        return regionList;
    }

    @GetMapping("language")
    public List<String> getLanguages() {
        List<String> languageList = new ArrayList<>();

        for (LanguageType status : LanguageType.values()) {
            languageList.add(status.toString());
        }

        return languageList;
    }
}
