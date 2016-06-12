package com.tannerrutgers.sechallenge.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * MVC Controller for home page
 */
@Controller
public class HomeController {

    @RequestMapping(method = RequestMethod.GET, value="/")
    public String loadPage() {
        return "index";
    }
}
