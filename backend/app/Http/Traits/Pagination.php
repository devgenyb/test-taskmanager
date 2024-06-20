<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\ResourceCollection;

trait Pagination {

    protected function pagination(Builder $data, Request $request, string $collection): ResourceCollection
    {   
        $page = $request->page ?? 1;
        $perPage = $request->per_page ?? 10;
        return new $collection($data->paginate(perPage:$perPage, page:$page));
    }
}