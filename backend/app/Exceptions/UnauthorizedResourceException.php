<?php

namespace App\Exceptions;

use JsonException;

class UnauthorizedResourceException extends JsonException
{

    public function __construct(string $message)
    {
        parent::__construct($message, 401);       
    }
}

