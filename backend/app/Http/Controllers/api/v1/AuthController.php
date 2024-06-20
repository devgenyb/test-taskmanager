<?php

namespace App\Http\Controllers\api\v1;

use App\Exceptions\BadPasswordException;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            "email" => ['required', 'email'],
            "password" => ['required',  'string', 'min:8'],
        ]);

        $user = User::with('roles')->where('email', $request->email)->first();
        if (!$user) {
            throw new NotFoundHttpException("email не найден");
        }
        if(!Hash::check($request->password, $user->password)) {
            throw new BadPasswordException();
        }
        $user->token = $user->createToken($user->email)->plainTextToken;
        return response()->json($user, 200);
    }

        // удаляем токен просто что бы в базе не висел
        public function logout(Request $request) {
            $request->user()->currentAccessToken()->delete();
            return response()->json(null, 200);
        }
}
