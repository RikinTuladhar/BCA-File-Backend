package com.example.bca.repository;

import com.example.bca.model.SemesterModel;
import com.example.bca.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SemesterRepository extends JpaRepository<SemesterModel,Integer> {
    SemesterModel findById(SemesterModel semesterModel);
}
