package com.wavech.expense.controller;

import com.wavech.expense.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ReportController {

    @Autowired
    TransactionService transactionService;

    @RequestMapping("/report")
    public ModelAndView getReportList(@RequestParam("report") boolean isReport, Model model) {

        model.addAttribute("monthReport", isReport?transactionService.getMonthReport():null);
        return new ModelAndView("homepage", model.asMap());
    }

}
