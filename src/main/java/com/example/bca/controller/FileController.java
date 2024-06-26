package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.dto.FileResponse;
import com.example.bca.dto.Message;
import com.example.bca.model.FileModel;
import com.example.bca.model.Subject;
import com.example.bca.model.User;
import com.example.bca.repository.FileRepo;
import com.example.bca.repository.SubjectRepo;
import com.example.bca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*")
public class FileController {
    @Autowired
    public FileRepo fileRepo;
    @Autowired
    public SubjectRepo subjectRepo;
    @Autowired
    public UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getFile() {
        List<FileModel> fileModels = fileRepo.findAll();
        if (fileModels != null && !fileModels.isEmpty()) {
            List<FileResponse> fileResponseList = new ArrayList<>();
            for (FileModel file : fileModels) {
                FileResponse fileResponse = new FileResponse();
                fileResponse.setId(file.getId());
                fileResponse.setName(file.getName());
                fileResponse.setFilePath(file.getFilePath());
                Subject subject = file.getSubject();
                fileResponse.setSubjectName(subject.getName());
                fileResponseList.add(fileResponse);
            }
            return ResponseEntity.ok(fileResponseList);
        }
        ErrorMessage errorMessage = new ErrorMessage("No files");
        return ResponseEntity.badRequest().body(errorMessage);
    }


    //    /file -> file/subjectid/1
    @GetMapping("subjectid/{subjectid}")
    public ResponseEntity<?> getFileBySubjectId(@PathVariable("subjectid") Integer subjectid) {
        List<FileModel> fileModels = fileRepo.findBySubjectId(subjectid);
        List<FileResponse> fileResponseList = new ArrayList<>();
        if (!fileModels.isEmpty()) {
            for (FileModel file : fileModels) {
                FileResponse fileResponse = new FileResponse();
                fileResponse.setId(file.getId());
                fileResponse.setName(file.getName());
                fileResponse.setFilePath(file.getFilePath());
                Subject subject = file.getSubject();
                fileResponse.setSubjectName(subject.getName());
                fileResponseList.add(fileResponse);
            }
            return ResponseEntity.ok(fileResponseList);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("No files found");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }


    @PostMapping("/{subjectid}/{userid}")
    public ResponseEntity<FileModel> postFile(
            @RequestBody FileModel fileModel,
            @PathVariable(name = "subjectid") Integer subjectid, //one to many
            @PathVariable(name = "userid") Integer userid //many to many
    ) {
        Subject subject = subjectRepo.findById(subjectid).orElseThrow(() -> new RuntimeException("Subject not found"));
        User user = userRepository.findById(userid).orElseThrow(() -> new RuntimeException("User not found"));
        fileModel.setSubject(subject); //one to many
        user.file(fileModel);  // many to many -> database bata fetch garera, deko body ko data insert garyo and again updated
        fileRepo.save(fileModel);
        userRepository.save(user);

        return ResponseEntity.ok(fileModel);
    }

    //    id of file to delte
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFileById(@PathVariable("id") Integer id) {
        if (id instanceof Integer) {
            fileRepo.deletedJoinTableUserFile(id);
            fileRepo.deleteJoinTableBookMark(id);
            fileRepo.deleteById(id);
            Message message = new Message("Deleted");
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Something went wrong");
            return ResponseEntity.badRequest().body(errorMessage);
        }

    }

}
