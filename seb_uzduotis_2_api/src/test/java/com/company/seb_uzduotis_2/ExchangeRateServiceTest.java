package com.company.seb_uzduotis_2;

import java.util.Arrays;

import java.util.List;
import java.util.Optional;

import com.company.seb_uzduotis_2.entities.ExchangeRate;
import com.company.seb_uzduotis_2.repositories.ExchangeRateRepository;
import com.company.seb_uzduotis_2.services.ExchangeRateService;
import com.company.seb_uzduotis_2.services.exceptions.ExchangeRateNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.persistence.EntityManager;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExchangeRateServiceTest {

    private ExchangeRateService exchangeRateService;

    @Mock
    private ExchangeRateRepository exchangeRateRepository;

    @Mock
    private EntityManager entityManager;



    @BeforeEach
    public void setUp() {
        exchangeRateService = new ExchangeRateService(exchangeRateRepository, entityManager);
    }

    @Test
    public void shouldReturnExchangeRate() {
        ExchangeRate exchangeRate = new ExchangeRate();

        when(exchangeRateRepository.findAll())
                .thenReturn(Arrays.asList(exchangeRate));

        List<ExchangeRate> allRates = exchangeRateService.getAllRates();
        Assertions.assertTrue(!allRates.isEmpty());
        verify(exchangeRateRepository).findAll();
    }

    @Test
    public void shouldReturnEmptyWhenNoExchangeRate() {
        List<ExchangeRate> allRates = exchangeRateService.getAllRates();
        Assertions.assertTrue(allRates.isEmpty());
    }

    @Test
    public void shouldThrowExceptionWhenNoExchangeRate() {
        Assertions.assertThrows(ExchangeRateNotFoundException.class, () -> exchangeRateService.getRateById(1L));
    }

    @Test
    public void shouldReturnExchangeRateById() {
        ExchangeRate exchangeRate = new ExchangeRate();
        when(exchangeRateRepository.findById(1L))
                .thenReturn(Optional.of(exchangeRate));

        ExchangeRate result = exchangeRateService.getRateById(1L);

        Assertions.assertTrue(result != null);
    }

    @Test
    public void shouldReturn5When5InDb() {
        ExchangeRate exchangeRate = new ExchangeRate();

        when(exchangeRateRepository.findAll())
                .thenReturn(Arrays.asList(exchangeRate, exchangeRate, exchangeRate, exchangeRate, exchangeRate));

        List<ExchangeRate> result = exchangeRateService.getAllRates();
        Assertions.assertTrue(result.size() == 5);
    }
}