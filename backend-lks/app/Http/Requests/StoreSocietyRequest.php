<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSocietyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_card_number' => 'required|numeric',
            'password' => 'required',
            'name' => 'required',
            'born_date' => 'required',
            'gender' => 'required|in:male,female',
            'address' => 'required',
            'regional_id' => 'required',



        ];
    }
}
