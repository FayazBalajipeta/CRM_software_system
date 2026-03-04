package com.crm.crm_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name="contact_info")
    private String contactInfo;

    private String source;

    private String status;

    @Column(name="sales_rep")
    private String salesRep;
}