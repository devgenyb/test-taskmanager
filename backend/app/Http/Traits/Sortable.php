<?php

namespace App\Http\Traits;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait Sortable {

    protected function aplySort($data, Request $request): Builder
    {
        $sort = explode( ':', $request->query('sort'));
        $table = (bool) $sort[0] ? $sort[0] : 'id';
        $order =  isset($sort[1]) ? $sort[1] : 'asc';
        return $data->orderBy($table, $order);
    }
}