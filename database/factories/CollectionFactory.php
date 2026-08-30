<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CollectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'album_id' => $this->faker->uuid(),
            'title' => $this->faker->words(3, true),
            'label' => $this->faker->company(),
            'artist' => $this->faker->name(),
            'cover_url' => $this->faker->imageUrl(),
        ];
    }
}