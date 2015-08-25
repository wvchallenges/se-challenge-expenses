package com.waveapps.sechallenge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UploadFileController {

    @RequestMapping("/UploadFile")
    public String init() {
        return "UploadFile.jsp";
    }

}