package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.dto.Message;
import com.example.bca.model.FileModel;
import com.example.bca.model.User;
import com.example.bca.repository.FileRepo;
import com.example.bca.repository.UserRepository;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/bookmarks")
public class BookMarkController {
    @Autowired
    public FileRepo fileRepo;
    @Autowired
    public UserRepository userRepository;

//    /bookmarks/1
    @GetMapping("/{u_id}")
    ResponseEntity<?> getBookMarksByUserId(@PathVariable("u_id")Integer u_id){
        List<FileModel> fileModelList =  fileRepo.findBookMarksByUserId(u_id);
        System.out.println(fileModelList);
        return ResponseEntity.ok(fileModelList);

    }
//    /bookmarks/1
    @PostMapping("/{f_id}/{u_id}")
    public ResponseEntity<?> postBookMarksByUserId(
            @PathVariable("u_id") Integer u_id,
            @PathVariable("f_id") Integer f_id
    ){
       if(u_id != null && f_id != null){
           //if req gareko id's milxha with bridge table ko id then remove garrna paryo
           // select query -> and -> compare
           // if (matched) -> remove query
           //else add query
           Integer count = fileRepo.findBookMarkedByUserIdAndFileId(u_id,f_id);
           if(count > 0){
               Integer deleted =  fileRepo.deleteBookMark(u_id,f_id);
                    if(deleted > 0){
                        Message message = new Message("Removed");
                        return ResponseEntity.ok(message);
                    }
                    else {
                        ErrorMessage errorMessage = new ErrorMessage("Not Removed Something went wrong");
                        return ResponseEntity.badRequest().body(errorMessage);
                    }
           }
           else {
               FileModel fileModel =  fileRepo.findById(f_id).orElseThrow(()-> new RuntimeException("No File Found"));
               User user =  userRepository.findById(u_id).orElseThrow(()-> new RuntimeException("No user found"));
               user.fileBooks(fileModel);
               Message message = new Message("BookMark Success");
               userRepository.save(user);
               return  ResponseEntity.ok(message);
           }


        }
       else {
           ErrorMessage errorMessage = new ErrorMessage("Invalid Request"+" User id"+ u_id + "File id" + f_id);
           return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
       }

    }


}
