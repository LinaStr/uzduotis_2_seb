package com.company.seb_uzduotis_2;

import com.company.seb_uzduotis_2.entities.ExchangeRate;
import com.company.seb_uzduotis_2.lbEntities.LBExchangeRate;
import com.company.seb_uzduotis_2.lbEntities.LBExchangeRates;
import com.company.seb_uzduotis_2.services.ExchangeRateService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class AppStartupRunner implements ApplicationRunner {
    XmlManager xmlManager ;
    ExchangeRateService exchangeRateService;

    public AppStartupRunner(XmlManager xmlManager, ExchangeRateService exchangeRateService) {
        this.xmlManager = xmlManager;
        this.exchangeRateService = exchangeRateService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Please wait till Database is loaded");
        StringBuffer xmlResponse = xmlManager.getXmlRequestFromLB();
        LBExchangeRates lbExchangeRates = xmlManager.getXmlAsLbExchangeRatesObject(xmlResponse);
        List<LBExchangeRate> exchangeRateList = lbExchangeRates.getFxRates();
//        System.out.println(exchangeRateList.toString());

        for (LBExchangeRate exchangeRateLb:exchangeRateList) {

//            ExchangeRate exchangeRateDb = exchangeRateService.findRateByDateAndCurrency(
//                    exchangeRateLb.getDate(),
//                    exchangeRateLb.ccyAmts.get(0).getCurrency()
//            ).orElse(new ExchangeRate());

            ExchangeRate exchangeRateDb = new ExchangeRate();
            exchangeRateDb.setDate(exchangeRateLb.getDate());
            exchangeRateDb.setBaseCurrency(exchangeRateLb.ccyAmts.get(0).getCurrency());
            exchangeRateDb.setBaseRate(exchangeRateLb.ccyAmts.get(0).getRate());
            exchangeRateDb.setCurrency(exchangeRateLb.ccyAmts.get(1).getCurrency());
            exchangeRateDb.setRate(exchangeRateLb.ccyAmts.get(1).getRate());

            exchangeRateService.saveExchangeRate(exchangeRateDb);


        }
    }
}
