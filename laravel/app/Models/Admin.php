<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable implements FilamentUser
{
    use Notifiable;


    public function canAccessFilament(): bool
    {
        return true; // or use role/permission check
    }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        return true; // or add your custom logic
    }

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
