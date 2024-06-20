<?php

namespace App\Http\Requests\v1\Task;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class TaskRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function createRules($required = true): array
    {
        $name = ['string', 'max:255'];
        $status_id = ['exists:task_statuses,id'];
        $done = ['boolean'];
        
        if ($required) {
            $name[] = 'required';
            $status_id[] = 'required';
            $done[] = 'required';
        }
        
        return [
            'name' => $name,
            'description' => ['nullable', 'string'],
            'status_id' => $status_id,
            'done' => $done,
        ];
    }
}
