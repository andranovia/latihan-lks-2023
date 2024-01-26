<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocietyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_card_number' => $this->id_card_number,
            'id_society' => $this->id,
            'password' => $this->password,
            'name' => $this->name,
            'address' => $this->address,
            'born_date' => $this->born_date,
            'regional_id' => $this->regional_id,
            'gender' => $this->gender == 'male' ? 'laki-laki' : 'perempuan',

        ];
    }
}
