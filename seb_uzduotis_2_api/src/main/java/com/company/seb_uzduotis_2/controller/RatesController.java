package com.company.seb_uzduotis_2.controller;

import com.company.seb_uzduotis_2.entities.ExchangeCalculation;
import com.company.seb_uzduotis_2.entities.ExchangeRate;
import com.company.seb_uzduotis_2.services.ExchangeRateService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/rates")
public class RatesController {

    private final ExchangeRateService exchangeRateService;

    public RatesController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

//    @ApiResponses({
//            @ApiResponse(code = 500, message = "Somethings wrong")
//    })

    @GetMapping("/availableCurrencies")
    public List<String> getAvailableCcy() {
        return exchangeRateService.getAllCurrencies();
    }

    @GetMapping("/availableDates")
    public List<String> getAvailableDates() {
        return exchangeRateService.getAllDates();
    }
//
//    @GetMapping("/currency{ccy}")
//    public List<ExchangeRate> getRatesByCurrency(@PathVariable String ccy) {
//        return exchangeRateService.getByCurrency(ccy);
//    }

    @GetMapping("/get")
    public Page<ExchangeRate> getRatesByCurrencyAndDatePaginated(
            @RequestParam(name = "currency", required = false) String ccy,
            @RequestParam(name = "date", required = false) String date,
            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize") int pageSize
    ) {
        return exchangeRateService.getRatesByCurrencyAndDate(pageNumber, pageSize, ccy, date);
    }

    @GetMapping("/calculate")
    public ExchangeCalculation getCalculated(
            @RequestParam(name = "ccyFrom") String ccyFrom,
            @RequestParam(name = "ccyTo") String ccyTo,
            @RequestParam(name = "amount") String amount
    ) {
       BigDecimal amountB = new BigDecimal(amount);
        return exchangeRateService.calculateExchangeRate(ccyFrom, ccyTo, amountB);
    }

}
