package com.crm.crm_backend.controller;

import com.crm.crm_backend.model.Sale;
import com.crm.crm_backend.repository.SaleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {

    private final SaleRepository saleRepository;

    @GetMapping
    public List<Sale> getSales(){
        return saleRepository.findAll();
    }

    @PostMapping
    public Sale createSale(@RequestBody Sale sale){
        return saleRepository.save(sale);
    }

    @PutMapping("/{id}")
    public Sale updateSale(@PathVariable Long id,@RequestBody Sale sale){

        Sale existing = saleRepository.findById(id).orElseThrow();

        existing.setDealName(sale.getDealName());
        existing.setCustomer(sale.getCustomer());
        existing.setAmount(sale.getAmount());
        existing.setStage(sale.getStage());
        existing.setClosingDate(sale.getClosingDate());
        existing.setSalesRep(sale.getSalesRep());

        return saleRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id){
        saleRepository.deleteById(id);
    }
}