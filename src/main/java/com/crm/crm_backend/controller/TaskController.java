package com.crm.crm_backend.controller;

import com.crm.crm_backend.model.Task;
import com.crm.crm_backend.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,@RequestBody Task task){

        Task existing = taskRepository.findById(id).orElseThrow();

        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setDueDate(task.getDueDate());
        existing.setPriority(task.getPriority());
        existing.setAssignedTo(task.getAssignedTo());
        existing.setStatus(task.getStatus());

        return taskRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }
}