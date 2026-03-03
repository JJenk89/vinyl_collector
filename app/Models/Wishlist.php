<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wishlist extends Model
{
    protected $fillable = ['album_id', 'title', 'label', 'artist', 'user_id', 'cover_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //get that user's wishlist item
    public function scopedUserQuery($query, $user_id)
    {
        return $query->where('user_id', $user_id);
    }
}
