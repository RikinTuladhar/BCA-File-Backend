<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory;

    public $fillable = ['name', 'slug', 'subject_id', 'url'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
