package com.example.taskmanagerbackend.service;

import com.example.taskmanagerbackend.model.Task;
import com.example.taskmanagerbackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Method to fetch all tasks with optional filtering by 'completed' status and pagination
    public Page<Task> getAllTasks(Boolean completed, Pageable pageable) {
        if (completed != null) {
            return taskRepository.findByCompleted(completed, pageable);
        }

        return taskRepository.findAll(pageable);
    }

    // Method to fetch a task by its ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Method to create a new task
    public Task createTask(Task task) {
        if (task.getName() == null || task.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Task name cannot be empty!");
        }
        return taskRepository.save(task);
    }

    // Method to update an existing task by its ID
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(updatedTask.getName());
                    task.setCompleted(updatedTask.isCompleted());
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new IllegalArgumentException("Task not found with ID: " + id));
    }

    // Method to delete a task by its ID
    public void deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Task not found with ID: " + id);
        }
    }
}
