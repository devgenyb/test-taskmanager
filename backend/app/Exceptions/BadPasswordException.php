<?php

namespace App\Exceptions;

use JsonException;

class BadPasswordException extends JsonException {
    public function __construct()
    {
        parent::__construct("Неверный пароль", 422);
    }
}