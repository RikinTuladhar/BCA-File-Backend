package com.example.bca.repository;

import com.example.bca.model.FileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileRepo extends JpaRepository<FileModel,Integer> {
    @Query(value = "SELECT * FROM file_model where subjectid = :subjectid",nativeQuery = true)
    List<FileModel> findBySubjectId(@Param("subjectid")Integer subjectid);
}
