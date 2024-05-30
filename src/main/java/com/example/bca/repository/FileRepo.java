package com.example.bca.repository;

import com.example.bca.model.FileModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileRepo extends JpaRepository<FileModel,Integer> {
    @Query(value = "SELECT * FROM file_model where subjectid = :subjectid",nativeQuery = true)
    List<FileModel> findBySubjectId(@Param("subjectid")Integer subjectid);

    @Query(value = "SELECT f.* FROM file_model f inner join bookmarks b on f.file_id = b.file_id  where b.user_id  = :u_id  ",nativeQuery = true)
    List<FileModel> findBookMarksByUserId(@Param("u_id") Integer u_id);

    @Query(value = "Select COUNT(*) from bookmarks where bookmarks.user_id = :u_id AND  bookmarks.file_id = :f_id",nativeQuery = true)
    Integer findBookMarkedByUserIdAndFileId(
            @Param("u_id") Integer u_id,
            @Param("f_id") Integer f_id
    );

    @Modifying
    @Transactional
    @Query(value = "delete from bookmarks b where b.user_id = :u_id AND  b.file_id =:f_id",nativeQuery = true)
    int deleteBookMark(
            @Param("u_id") Integer u_id,
            @Param("f_id") Integer f_id
    );

    @Modifying
    @Transactional
    @Query(value = "delete from user_file u where u.file_id = :id",nativeQuery = true)
    int deletedJoinTableUserFile(@Param("id")Integer id);

    @Modifying
    @Transactional
    @Query(value = "delete from bookmarks b where b.file_id = :id",nativeQuery = true)
    int deleteJoinTableBookMark(@Param("id") Integer id);


}
