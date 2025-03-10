package com.walab.lecture.presentation.dto;

import com.walab.lecture.application.dto.LectureCreateDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LectureCreateRequest {
    private Long classId;
    private int lectureNum;
    private LocalDateTime modDate;
    private Long contentsId;

    public LectureCreateDto lectureCreateDto() {
        return new LectureCreateDto(this);
    }
}