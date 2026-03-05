package com.crm.crm_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dealName;

    private Double amount;

    private String stage;

    private LocalDate closingDate;

    private String salesRep;

    // 🔗 Link Sale → Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}