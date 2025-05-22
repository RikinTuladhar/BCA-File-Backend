<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory;

    public $fillable = ['name', 'slug', 'semester_id'];

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
