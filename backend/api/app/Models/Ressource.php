<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
    use HasFactory;

    protected $table = 'ressource';
    protected $primaryKey = 'Id_Ressource';
    public $timestamps = true;

    protected $fillable = [
        'Title_Ressource',
        'Description_Ressource',
        'State_Ressource',
        'Public_Ressource',
        'Content_Ressource',
        'Type_Ressource',
        'Id_Category',
        'Id_RelationType',
        'Id_User',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'Id_Category', 'id');
    }

    public function relationType()
    {
        return $this->belongsTo(RelationType::class, 'Id_RelationType', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }
}
