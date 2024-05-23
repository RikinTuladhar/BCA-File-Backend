package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.model.SemesterModel;
import com.example.bca.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Retention;
import java.util.List;

@RestController
@RequestMapping("/semester")
@CrossOrigin(origins = "*")
public class SemesterController {

    @Autowired
    SemesterRepository semesterRepository;

    @GetMapping
    ResponseEntity<?> getSemester() {
        List<SemesterModel> semesterModelList = semesterRepository.findAll();
        if (!semesterModelList.isEmpty()) {
            return ResponseEntity.ok(semesterModelList);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("No Semester found");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @PostMapping
    ResponseEntity<?> postSemester(@RequestBody SemesterModel semesterModel) {
        if (validSemesterFiled(semesterModel)) {
            return ResponseEntity.ok(semesterRepository.save(semesterModel));

        } else {
            ErrorMessage errorMessage = new ErrorMessage("All Fields Required");
            return ResponseEntity.badRequest().body(errorMessage);
        }


    }

    private boolean validSemesterFiled(SemesterModel semesterModel) {
        return !semesterModel.getName().isEmpty() && semesterModel.getName() != null;
    }

}
