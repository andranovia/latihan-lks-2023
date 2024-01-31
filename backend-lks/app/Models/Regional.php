<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    use HasFactory;


    protected $primaryKey = 'id';
    protected $guarded = [];
    protected $table = 'regionals';
    public $timestamps = false;
}
