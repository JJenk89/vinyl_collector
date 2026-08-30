<?php

use App\Models\User;

test('a user password and remember_token are hidden when serialized', function () {
    $user = User::factory()->create();

    dump($user->toArray());

    expect($user->toArray())->not->toHaveKey('password');
    expect($user->toArray())->not->toHaveKey('remember_token');
});