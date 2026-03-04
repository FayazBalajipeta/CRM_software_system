package com.crm.crm_backend.controller;

import com.crm.crm_backend.model.Lead;
import com.crm.crm_backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    private final LeadRepository leadRepository;

    @GetMapping
    public List<Lead> getLeads() {
        return leadRepository.findAll();
    }

    @PostMapping
    public Lead addLead(@RequestBody Lead lead) {
        return leadRepository.save(lead);
    }

    @PutMapping("/{id}")
    public Lead updateLead(@PathVariable Long id, @RequestBody Lead lead) {

        Lead existing = leadRepository.findById(id).orElseThrow();

        existing.setName(lead.getName());
        existing.setContactInfo(lead.getContactInfo());
        existing.setSource(lead.getSource());
        existing.setStatus(lead.getStatus());
        existing.setSalesRep(lead.getSalesRep());

        return leadRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        leadRepository.deleteById(id);
    }
}