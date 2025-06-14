<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyMaterial extends Model
{
    //

    public $fillable = [
        'name',
        'description',
        'slug',
        'link',
        'creator',
        'creator_link',
        'tag',
    ];

    public function casts()
    {
        return [
            'tag' => 'array'
        ];
    }
}
