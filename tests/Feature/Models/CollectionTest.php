<?php

use App\Models\Collection;
use App\Models\User;

test('a collection belongs to a user', function () {
    $collection = Collection::factory()->create();

    expect($collection->user)->toBeInstanceOf(User::class);
});

test('a user cannot have duplicate albums in their collection', function () {
    $user = User::factory()->create();

    Collection::factory()->create([
        'user_id' => $user->id,
        'album_id' => 'album-123',
    ]);

    Collection::factory()->create([
        'user_id' => $user->id,
        'album_id' => 'album-123',
    ]);
})->throws(\Illuminate\Database\QueryException::class);