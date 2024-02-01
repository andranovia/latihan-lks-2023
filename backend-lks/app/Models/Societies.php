<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class Societies extends Model implements Authenticatable
{
    use AuthenticatableTrait;
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id';
    protected $guarded = [];
    protected $table = 'societies';
    public $timestamps = false;


    
}
