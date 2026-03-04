package com.crm.crm_backend.service;

import com.crm.crm_backend.model.Customer;
import com.crm.crm_backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {

        Customer customer = customerRepository.findById(id).orElseThrow();

        customer.setName(updatedCustomer.getName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setPhone(updatedCustomer.getPhone());
        customer.setCompany(updatedCustomer.getCompany());
        customer.setAddress(updatedCustomer.getAddress());
        customer.setSalesRep(updatedCustomer.getSalesRep());
        customer.setNotes(updatedCustomer.getNotes());

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}