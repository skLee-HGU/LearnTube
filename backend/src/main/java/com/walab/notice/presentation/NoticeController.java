package com.walab.notice.presentation;

import com.walab.notice.applecation.NoticeService;
import com.walab.notice.applecation.dto.*;

import com.walab.notice.domain.repository.NoticeRepository;
import com.walab.notice.domain.request.NoticeCreationRequest;

import com.walab.notice.domain.request.NoticeDeleteRequest;
import com.walab.notice.domain.request.NoticeUpdateRequest;
import com.walab.notice.presentation.response.NoticeIdResponse;
import com.walab.notice.presentation.response.NoticeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeRepository noticeRepository;

    @PostMapping(value = "notice")
    public ResponseEntity<NoticeResponse> createNotice (@RequestBody NoticeCreationRequest request) {
        NoticeDto createNotice = noticeService.createNotice(request.noticeCUDto(), request.getClassId());
        NoticeResponse response = createNotice.noticeResponse();
        return ResponseEntity.ok(response);
    }

    @PatchMapping(value ="notice")
    public ResponseEntity<NoticeResponse> updateNotice (@RequestBody NoticeUpdateRequest request) {
        NoticeDto updateNotice = noticeService.updateNotice(request.getNoticeId(), request.noticeCUDto());
        NoticeResponse response = updateNotice.noticeResponse();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("notice")
    public ResponseEntity<NoticeIdResponse> deleteNotice (@RequestBody NoticeDeleteRequest request){
        NoticeIdDto deleteNoticeIdDto = noticeService.delete(request.toDto());
        NoticeIdResponse response = deleteNoticeIdDto.noticeIdResponse();
        return ResponseEntity.ok(response);
    }

    @GetMapping("notice")
    public ResponseEntity<Object> getNotices(@RequestParam Long classId){
        List<NoticeDetailDto> noticeList =  noticeService.getNotices(classId);

        return ResponseEntity.ok(noticeList);

    }
}

