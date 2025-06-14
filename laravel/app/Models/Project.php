<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    public $fillable = [
        'name',
        'description',
        'slug',
        'link',
        'creator',
        'creator_link',
        'tech_stack',
    ];

    public function casts()
    {
        return [
            'tech_stack' => 'array'
        ];
    }
}
