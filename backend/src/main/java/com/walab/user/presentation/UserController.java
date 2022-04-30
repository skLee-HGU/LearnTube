package com.walab.user.presentation;

import com.walab.user.application.UserService;
import com.walab.user.application.dto.UserDto;
import com.walab.user.presentation.request.UserLoginRequest;
import com.walab.user.presentation.response.UserResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest request){
        UserDto userDto = userService.userLogin(request.userDto());
        UserResponse response = userDto.userResponse();

        return ResponseEntity.ok(response);
    }
}
