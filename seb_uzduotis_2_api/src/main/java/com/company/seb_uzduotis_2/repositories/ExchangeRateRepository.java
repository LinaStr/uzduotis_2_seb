package com.company.seb_uzduotis_2.repositories;


import com.company.seb_uzduotis_2.entities.ExchangeRate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {

    List<ExchangeRate> findByCurrencyOrderByDateDesc(String date);

    Page<ExchangeRate> findAllByCurrency(Pageable var1, String ccy);
    Page<ExchangeRate> findAllByDate(Pageable var1, String date);
    Page<ExchangeRate> findFirstByCurrencyAndDateLessThanEqual(Pageable var1, String ccy, String date);
    ExchangeRate findFirstByCurrencyOrderByDateDesc(String ccy);
}
