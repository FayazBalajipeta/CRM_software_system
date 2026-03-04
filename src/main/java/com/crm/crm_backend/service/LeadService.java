package com.crm.crm_backend.service;

import com.crm.crm_backend.model.Lead;
import com.crm.crm_backend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Lead createLead(Lead lead) {
        return leadRepository.save(lead);
    }

    public Lead updateLead(Long id, Lead updatedLead) {

        Lead lead = leadRepository.findById(id).orElseThrow();

        lead.setName(updatedLead.getName());
        lead.setContactInfo(updatedLead.getContactInfo());
        lead.setSource(updatedLead.getSource());
        lead.setStatus(updatedLead.getStatus());
        lead.setSalesRep(updatedLead.getSalesRep());

        return leadRepository.save(lead);
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
}