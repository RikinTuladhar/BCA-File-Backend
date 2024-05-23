package com.example.bca.repository;

import com.example.bca.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubjectRepo extends JpaRepository<Subject,Integer> {

    @Query(value = "SELECT * FROM subject where semester_id = :semesterId",nativeQuery = true)
    List<Subject> findSubjectBySemesterId(@Param("semesterId")int semesterId);

}
