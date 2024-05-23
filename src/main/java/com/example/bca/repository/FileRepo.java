package com.example.bca.repository;

import com.example.bca.model.FileModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepo extends JpaRepository<FileModel,Integer> {
}
