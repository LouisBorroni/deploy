<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'Id_User';
    public $timestamps = true;

    protected $fillable = [
        'FirstName_User',
        'LastName_User',
        'Email_User',
        'Tel_User',
        'Password_User',
        'Token_User',
        'Id_Role',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'Id_Role', 'id');
    }
}
