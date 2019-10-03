package com.wavech.expense.controller;

import com.wavech.expense.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Gopiraj on 3/5/2018.
 */
@Controller

public class IndexController {

    @Autowired
    TransactionService transactionService;

    @RequestMapping("/")
    public String index(Model model) {

        model.addAttribute("monthReport", transactionService.getMonthReport());
        return "homepage";
    }
}
