package com.crm.crm_backend.repository;

import com.crm.crm_backend.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Long> {
}