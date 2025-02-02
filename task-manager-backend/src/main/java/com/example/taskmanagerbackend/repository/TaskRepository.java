package com.example.taskmanagerbackend.repository;

import com.example.taskmanagerbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {


    Page<Task> findByCompleted(Boolean completed, Pageable pageable);

    Page<Task> findAll(Pageable pageable);

}
