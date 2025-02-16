<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wishlist extends Model
{
    protected $fillable = ['album_id', 'name', 'artist', 'user_id'];

    //get the user that owns the wishlist item
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //get that user's wishlist item, scoped query
    public function scopedUserQuery($query, $user_id)
    {
        return $query->where('user_id', $user_id);
    }
}
