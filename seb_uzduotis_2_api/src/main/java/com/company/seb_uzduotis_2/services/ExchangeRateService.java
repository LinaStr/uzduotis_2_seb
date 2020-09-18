package com.company.seb_uzduotis_2.services;


import com.company.seb_uzduotis_2.entities.ExchangeCalculation;
import com.company.seb_uzduotis_2.entities.ExchangeRate;
import com.company.seb_uzduotis_2.repositories.ExchangeRateRepository;
import com.company.seb_uzduotis_2.services.exceptions.ExchangeRateNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@Service
public class ExchangeRateService {

    private ExchangeRateRepository exchangeRateRepository;
    private EntityManager entityManager;

    public ExchangeRateService(ExchangeRateRepository exchangeRateRepository, EntityManager entityManager)
    {
        this.exchangeRateRepository = exchangeRateRepository;
        this.entityManager = entityManager;
    }


    public List<ExchangeRate> getAllRates() {
        return exchangeRateRepository.findAll();
    }

    public ExchangeRate saveExchangeRate(ExchangeRate exchangeRate) {
        return exchangeRateRepository.save(exchangeRate);
    }

    public Page<ExchangeRate> getRatesPaginated(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return exchangeRateRepository.findAll(pageable);
    }


    public ExchangeRate getRateById(Long id) {
        return exchangeRateRepository.findById(id)
                .orElseThrow(() -> new ExchangeRateNotFoundException("Rate was not found"));
    }

    public List<String> getAllCurrencies(){
        Query q = entityManager.createNativeQuery("SELECT currency FROM exchange_rates group by currency");
        List<String> currencies = q.getResultList();
return currencies;
    }

    public List<String> getAllDates() {
        Query q = entityManager.createNativeQuery("SELECT date FROM exchange_rates group by date order by date desc");
        List<String> dates = q.getResultList();
        return dates;
    }

    public List<ExchangeRate> getByCurrency(String ccy){
        return exchangeRateRepository.findByCurrencyOrderByDateDesc(ccy);
    }


    public Page<ExchangeRate> getRatesByCurrencyAndDate(int pageNumber, int pageSize, String ccy, String date) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        if (date == null && ccy != null) {
            return exchangeRateRepository.findAllByCurrency(pageable, ccy);
        }

        if (date != null && ccy == null) {
            return exchangeRateRepository.findAllByDate(pageable, date);
        }

        if (date == null) {
            return exchangeRateRepository.findAll(pageable);
        }

        return exchangeRateRepository.findFirstByCurrencyAndDateLessThanEqual(pageable, ccy, date);
    }

    public ExchangeCalculation calculateExchangeRate(String ccyFrom, String ccyTo, BigDecimal amount) {
        ExchangeCalculation exchangeCalculation = new ExchangeCalculation();
        BigDecimal rateFrom = exchangeRateRepository.findFirstByCurrencyOrderByDateDesc(ccyFrom).getRate();
        BigDecimal rateTo = exchangeRateRepository.findFirstByCurrencyOrderByDateDesc(ccyTo).getRate();
        BigDecimal calculatedAmount = (amount.divide(rateFrom).multiply(rateTo));

        exchangeCalculation.setCcyFrom(ccyFrom);
        exchangeCalculation.setRateFrom(rateFrom);
        exchangeCalculation.setCcyTo(ccyTo);
        exchangeCalculation.setRateFrom(rateTo);
        exchangeCalculation.setCalculatedAmount(calculatedAmount);

        return exchangeCalculation;
    }
}
